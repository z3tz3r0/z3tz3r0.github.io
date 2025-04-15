import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import InputContact from "../components/InputContact";
import SubTopic from "../components/SubTopic";
import Layout from "../containers/Layout";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove any character that is NOT a digit (0-9)
        const numericValue = e.target.value.replace(/[^0-9]/g, "");
        setPhone(numericValue);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add form submission logic here (fetch to Formspree or API)
        console.log("Submitting:", { name, email, phone });
    };

    return (
        <Layout id="contact" className="bg-white/5">
            <div className="max-w-7xl mx-auto">
                <SubTopic>Let's Contact</SubTopic>
                <form onSubmit={handleSubmit}>
                    <InputContact
                        type="text"
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputContact
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputContact
                        type="tel"
                        label="Phone Number"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                    <InputContact type="textarea" label="Message" />
                    <Button type="submit">Send Message</Button>
                </form>
            </div>
        </Layout>
    );
};

export default Contact;
