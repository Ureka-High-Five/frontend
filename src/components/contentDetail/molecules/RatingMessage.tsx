interface RatingMessageProps {
  message: string;
}

const RatingMessage = ({ message }: RatingMessageProps) => (
  <div className="body-md-pretendard text-custom-gray w-full text-center">
    {message}
  </div>
);

export default RatingMessage;
