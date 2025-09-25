import ProfileForm from "@/app/components/forms/profile-form"
export default function ProfilePage() {
     const sampleData = {
        email: "priya.patel@swaphub.test",
        password: "password1234", 
        firstname: "Priya",
        lastname: "Patel"
    };
    return (
        <>
        <ProfileForm profileData={sampleData}></ProfileForm>
        </>
    )
}