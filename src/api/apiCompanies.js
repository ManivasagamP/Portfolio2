import supabaseClient from "@/utils/supabase";

export async function getCompanies(token) {
    const supabase = await supabaseClient(token);

    let query = supabase
        .from("companies")
        .select("*");

    const { data, error: companiesError } = await query;

    if (companiesError) {
        console.error("Error fetching companies:", companiesError);
        return null;
    }

    return data;
}