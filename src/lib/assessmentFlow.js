import { generateAssessmentQuestions } from './apiUtils';
import { supabase } from './supabase';

export const startLoggedInAssessment = async (navigate, setIsSubmitting) => {
    try {
        if (setIsSubmitting) setIsSubmitting(true);
        let age = 30;
        let gender = 'male';

        const userEmail = sessionStorage.getItem('userEmail');
        if (userEmail) {
            const { data, error } = await supabase
                .from('users')
                .select('age, gender')
                .eq('email', userEmail)
                .single();
            if (data && !error) {
                if (data.age) age = data.age;
                if (data.gender) gender = data.gender;
                sessionStorage.setItem('userAge', data.age);
                sessionStorage.setItem('userGender', data.gender);
            }
        } else {
            age = sessionStorage.getItem('userAge') || 30;
            gender = sessionStorage.getItem('userGender') || 'male';
        }

        const questionsData = await generateAssessmentQuestions(age, gender);
        sessionStorage.setItem('assessmentId', questionsData.assessmentId);
        sessionStorage.setItem('assessmentSections', JSON.stringify(questionsData.sections));
        navigate('/question');
        window.scrollTo(0, 0);
    } catch (err) {
        console.error(err);
        alert('Failed to generate assessment. Please try again.');
    } finally {
        if (setIsSubmitting) setIsSubmitting(false);
    }
};
