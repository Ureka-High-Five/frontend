import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.png";
import LandingLayout from "@/components/landing/LandingLayout";

const MESSAGES = ["콘텐츠의 바다를 헤매는 당신을 위해", "Read Me & Lead Me"];

const LandingPage = () => {
	const [isLogoVisible, setIsLogoVisible] = useState(false);
	const [isSubTextVisible, setIsSubTextVisible] = useState(false);
	const [isKakaoButtonVisible, setIsKakaoButtonVisible] = useState(false);
	const [messageIndex, setMessageIndex] = useState(0);

	useEffect(() => {
		setIsLogoVisible(true);
		const subTextTimer = setTimeout(() => setIsSubTextVisible(true), 900);
		const messageTimer = setTimeout(() => setMessageIndex(1), 900 + 1500);
		const kakaoTimer = setTimeout(
			() => setIsKakaoButtonVisible(true),
			900 + 1500 + 1400
		);

		return () => {
			clearTimeout(subTextTimer);
			clearTimeout(messageTimer);
			clearTimeout(kakaoTimer);
		};
	}, []);

	return (
		<LandingLayout
			logo={
				<AnimatePresence>
					{isLogoVisible && (
						<motion.img
							src={logoImg}
							alt="로고"
							initial={{ opacity: 0, y: -40 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 40 }}
							transition={{ duration: 0.8, ease: "easeOut" }}
						/>
					)}
				</AnimatePresence>
			}
			subText={
				<AnimatePresence mode="wait">
					{isSubTextVisible && (
						<motion.p
							key={messageIndex}
							className="text-gray-400 text-sm tracking-wide"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.5 }}>
							{MESSAGES[messageIndex]}
						</motion.p>
					)}
				</AnimatePresence>
			}
			action={
				<AnimatePresence>
					{isKakaoButtonVisible && (
						<motion.button
							type="button"
							className="w-[90%] max-w-sm h-14 bg-[#FEE500] text-black text-xl font-bold rounded-xl shadow-md"
							initial={{ opacity: 0, y: 60 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 60 }}
							transition={{ duration: 0.7, ease: "easeOut" }}>
							카카오로 시작하기
						</motion.button>
					)}
				</AnimatePresence>
			}
		/>
	);
};

export default LandingPage;
