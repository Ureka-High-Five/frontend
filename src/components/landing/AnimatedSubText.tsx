import { motion, AnimatePresence } from "framer-motion";

interface AnimatedSubTextProps {
	isVisible: boolean;
	text: string;
	keyVal: number;
}

const AnimatedSubText = ({ isVisible, text, keyVal }: AnimatedSubTextProps) => (
	<AnimatePresence mode="wait">
		{isVisible && (
			<motion.p
				key={keyVal}
				className="text-gray-400 text-sm tracking-wide"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.5 }}>
				{text}
			</motion.p>
		)}
	</AnimatePresence>
);

export default AnimatedSubText;
