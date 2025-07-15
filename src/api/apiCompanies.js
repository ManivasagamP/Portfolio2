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

export async function addNewCompany(token, _, companyData) {
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() * 90000);
    const fileName = `logo-${random}-${companyData.name}`;

    const { error: storageError } = await supabase.storage
        .from("company-logo")
        .upload(fileName, companyData.logo);

    if (storageError) throw new Error("Error uploading Company Logo");

    const { data: publicUrlData } = supabase.storage.from("company-logo").getPublicUrl(fileName);
    const logo_url = publicUrlData.publicUrl

    const { data, error } = await supabase
        .from("companies")
        .insert([
            {
                name: companyData.name,
                logo_url: logo_url,
            },
        ])
        .select();

    if (error) {
        console.error("Error adding new Company: ",error);
        throw new Error("Error adding new Company");
    }

    return data;
}