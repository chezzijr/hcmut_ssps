import React from "react";
import "./BlueButton.css";
import { useNavigate } from "react-router-dom";

interface BlueButtonProps {
  text?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
}

const BlueButton: React.FC<BlueButtonProps> = ({
  text = "Đăng nhập",
  className,
  onClick,
  to,
}) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }

    if (to) {
      navigate(to);
    }
  };

  return (
    <div className="BlueButton">
      <button className={className} onClick={handleClick}>
        {text}
      </button>
    </div>
  );
};

export default BlueButton;
