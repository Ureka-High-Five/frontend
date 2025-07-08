import { motion, AnimatePresence } from "framer-motion";

interface KakaoButtonProps {
	isVisible: boolean;
}

const KakaoButton = ({ isVisible }: KakaoButtonProps) => (
	<AnimatePresence>
		{isVisible && (
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
);

export default KakaoButton;
