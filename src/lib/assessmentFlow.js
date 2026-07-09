import { generateAssessmentQuestions } from './apiUtils';
import { fetchUserWithAssessments } from './backendApi';

export const startLoggedInAssessment = async (navigate, setIsSubmitting) => {
    try {
        if (setIsSubmitting) setIsSubmitting(true);
        let age = sessionStorage.getItem('userAge') || 30;
        let gender = sessionStorage.getItem('userGender') || 'male';

        // If the profile isn't cached in this session, fetch it from the backend
        const userId = sessionStorage.getItem('userId');
        if ((!sessionStorage.getItem('userAge') || !sessionStorage.getItem('userGender')) && userId) {
            try {
                const user = await fetchUserWithAssessments(userId);
                if (user.age) { age = user.age; sessionStorage.setItem('userAge', String(user.age)); }
                if (user.gender) { gender = user.gender; sessionStorage.setItem('userGender', user.gender); }
            } catch (err) {
                console.warn('Could not fetch profile — using defaults:', err.message);
            }
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
