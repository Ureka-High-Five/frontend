import { useEffect, useState } from "react";
import logoImg from "@/assets/logo.png";
import AnimatedLogo from "@/components/landing/AnimatedLogo";
import AnimatedSubText from "@/components/landing/AnimatedSubText";
import LandingLayout from "@/components/landing/LandingLayout";
import SocialLoginButton from "@/components/landing/SocialLoginButton";

const MESSAGES = ["콘텐츠의 바다를 헤매는 당신을 위해", "Read Me & Lead Me"];

const LandingPage = () => {
	const [isLogoVisible, setIsLogoVisible] = useState(false);
	const [isSubTextVisible, setIsSubTextVisible] = useState(false);
	const [isSocialButtonVisible, setIsSocialButtonVisible] = useState(false);
	const [messageIndex, setMessageIndex] = useState(0);

	useEffect(() => {
		setIsLogoVisible(true);
		const subTextTimer = setTimeout(() => setIsSubTextVisible(true), 900);
		const messageTimer = setTimeout(() => setMessageIndex(1), 900 + 1500);
		const socialBtnTimer = setTimeout(
			() => setIsSocialButtonVisible(true),
			900 + 1500 + 1400
		);

		return () => {
			clearTimeout(subTextTimer);
			clearTimeout(messageTimer);
			clearTimeout(socialBtnTimer);
		};
	}, []);

	return (
		<LandingLayout
			logo={<AnimatedLogo isVisible={isLogoVisible} src={logoImg} alt="로고" />}
			subText={
				<AnimatedSubText
					isVisible={isSubTextVisible}
					text={MESSAGES[messageIndex]}
					keyVal={messageIndex}
				/>
			}
			action={<SocialLoginButton isVisible={isSocialButtonVisible} />}
		/>
	);
};

export default LandingPage;
