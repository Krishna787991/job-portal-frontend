import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6"
import AlertComponent from './AlertComponent'

function Newsletter() {
    const [email, setEmail] = useState("")
    const [flag, setFlag] = useState(false)

    const [Error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [content, setContent] = useState("");

    const updateSubscription = async (flag) => {
        const response = await axios.patch("http://localhost:3000/api/v1/user/", { flag }, { withCredentials: true })
        console.log(response.data)
        if (response.data.Status != 201) {
            setError(true)
            setContent(response.data.Error)
        }
        else if(response.data.Status==201 && flag){
            setSuccess(true)
            setContent("You have unsubscribed the news letter. ")
        }
        else {
            setSuccess(true)
            setContent("Thanks,You will get Daily business news at 8 AM ")
        }
    }

    const getInfo = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/user/", { withCredentials: true })
        setEmail(response.data.user.email)
        setFlag(response.data.user.subscribe)
    }

    const handleSubscribtion = () => {
        if(email===""){
            setError(true)
            setContent("You are not logged in")
            return;
        }
        setFlag(!flag)
        updateSubscription(flag)
    }

    useEffect(() => {
        getInfo();
    }, [])


    return (
        <>
        {Error ? <AlertComponent severity={"error"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}
        {success ? <AlertComponent severity={"success"} content={content} Error={Error} setError={setError} success={success} setSuccess={setSuccess} /> : ""}
            <div>
                <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                        <FaEnvelopeOpenText />
                        Daily News Letter
                    </h3>
                    <p className="text-primary/75 text-base mb-4"> Nokri's Weekly Newsletter delivers curated job listings and industry insights directly to your inbox, ensuring you never miss out on the perfect opportunity or ideal candidate..</p>
                    <div className="w-full space-y-4">
                        <input type="email" name="email" id="email" placeholder="name@mail.com" value={email} className="w-full block py-2
        pl-3 border focus:outline-none"/>

                        <button className="w-full block py-2 p1-3 border focus:outline-none
        bg-blue rounded-smtext-white cursor-pointer font-semibold" onClick={handleSubscribtion} >{flag ? "Unsubscribe" : "Subscribe"}</button>
                    </div>
                </div>
                {/* 2nd part */}

                <div className='mt-24'>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                        <FaRocket />
                        Get noticed faster
                    </h3>
                    <p className="text-primary/75 text-base mb-4">Ut esse eiusmod aute. Sit enim labore dolore. Aute ea
                        fugiat commodo ea foes.</p>

                    <div className="w-full space-y-4">

                        <input type="submit" value={"Upload your resume"} className="w-full block py-2 p1-3 border focus:outline-none
        bg-blue rounded-smtext-white cursor-pointer font-semibold"/>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Newsletter