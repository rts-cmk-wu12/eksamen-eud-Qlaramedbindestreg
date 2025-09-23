"use client";
import "./profile-form.scss";

export default function ProfileForm({ profileData } ) {
   
    return (
        <div className="profileform__container">
        <form>

            <div>
                <label>
                    <span>
                        Username
                    </span>
                    <input type="text" name="username" value={profileData.username} defaultValue/>
                </label>
                <span></span>
            </div>

                <div>
                <label>
                    <span>
                       Firstname
                    </span>
                    <input type="text" name="firstname" defaultValue={profileData.firstname} />
                </label>
                <span></span>
            </div>

                <div>
                <label>
                    <span>
                        Lastname
                    </span>
                    <input type="text" name="lastname" defaultValue={profileData.lastname} />
                </label>
                <span></span>
            </div>

 

                       <div>
                <label>
                    <span>
                        Profileimage
                    </span>
                    <input type="file" name="profileimage" accept="image/*" multiple />
                </label>
                <span></span>
            </div>
            <button type="submit"></button>
        </form>
        </div>
    )
}