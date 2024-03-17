import Layout from "../components/layout";
import Image from 'next/image';
import {signIn, useSession} from "next-auth/react";
import styles from "./homepage.module.css";

export default function Index() {
    const {data: session, status} = useSession();
    const handleLogin = () => {
        console.log('Login');
        signIn("worldcoin", { callbackUrl: '/dashboard' });
    }

    return (
        <Layout>
            <div className={styles.heroContainer}>
                <div className={styles.logoWrapper}>
                    <Image src={require("../assets/img/logo.svg")} layout="fill" objectFit="contain" alt="Logo" />
                </div>
                <div className={styles.introText}>
                    <p>Welcome to the future of digital security. Authenticate and manage your digital identity with unprecedented ease and ironclad protection.</p>
                </div>
                <div className={styles.imageWrapper}>
                    <Image src={require("../assets/img/secure-drawing.svg")} layout="fill" objectFit="contain" alt="Hero" />
                </div>
                {session?.user ? (
                    <div className={styles.loginButtonContainer}>
                        <button className={styles.loginButton} onClick={() => window.location.href = '/dashboard'}>Go to Dashboard</button>
                    </div>
                )
                    :
                    (
                        <div className={styles.loginButtonContainer}>
                            <button className={styles.loginButton} onClick={handleLogin}>Connect with Worldcoin</button>
                        </div>
                    )

                }
            </div>
        </Layout>
    );
}
