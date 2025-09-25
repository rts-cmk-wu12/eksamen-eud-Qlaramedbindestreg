"use client";
import "./profile-form.scss";



export default function ProfileForm({ profileData } ) {
   
   const displayData = profileData || {
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    };

    const handleSubmit = (e) => {
        e.preventDefault();
     
    };

    return (
        //Kilde: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/components/ui/forms/profil-form/index.jsx
        <div className="profileform__container">
        <form onSubmit={handleSubmit}>

            <div >
                <label>
                    <span>
                        Email
                    </span>
                    <input type="email" name="email" defaultValue={displayData.email } />
                </label>
       
            </div>

                    <div>
                <label>
                    <span>
                        Password
                    </span>
                    <input type="password" name="password" defaultValue={displayData.password} />
                </label>
     
            </div>


                <div>
                <label>
                    <span>
                       Firstname
                    </span>
                    <input type="text" name="firstname" defaultValue={displayData.firstname} />
                </label>
             
            </div>

                <div>
                <label>
                    <span>
                        Lastname
                    </span>
                    <input type="text" name="lastname" defaultValue={displayData.lastname} />
                </label>
           
            </div>


            <button type="submit">
                Update Profile
            </button>
        </form>
        </div>
    )
}