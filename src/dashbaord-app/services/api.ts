import { supabase } from "@/lib/supabase"

/**
 * Note: These are scaffolded service functions assuming your Supabase tables 
 * and RLS policies are set up according to the schema provided.
 */

// Users
export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*, assessments(*)").order("created_at", { ascending: false })
  if (error) throw error
  
  return data.map(user => {
    const sortedAssessments = user.assessments?.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || [];
    const latest = sortedAssessments[0];
    return {
      ...user,
      report_json: latest?.report_json || null,
      pdf_url: latest?.pdf_url || null,
      assessments: sortedAssessments
    };
  });
}

export async function getUserById(id: string) {
  const { data, error } = await supabase.from("users").select("*, assessments(*)").eq("id", id).single()
  if (error) throw error
  
  const sortedAssessments = data.assessments?.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || [];
  const latest = sortedAssessments[0];
  return {
    ...data,
    report_json: latest?.report_json || null,
    pdf_url: latest?.pdf_url || null,
    assessments: sortedAssessments
  };
}

export async function updateUserStatus(id: string, status: string) {
  const { data, error } = await supabase.from("users").update({ payment_status: status }).eq("id", id)
  if (error) throw error
  return data
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from("users").delete().eq("id", id)
  if (error) throw error
  return true
}

// Subscriptions / Plans
export async function getPlans() {
  const { data, error } = await supabase.from("plans").select("*").order("price", { ascending: true })
  if (error) throw error
  return data
}

// Dashboard KPIs (Aggregated)
export async function getDashboardStats() {
  // Typically you would call a PostgreSQL function (RPC) or aggregate on the server side for this.
  // Example call to a custom RPC function:
  const { data, error } = await supabase.rpc("get_admin_dashboard_stats")
  if (error) throw error
  return data
}
