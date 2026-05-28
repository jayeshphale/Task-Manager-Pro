const Card = ({ children, className = "" }) => {
  return (
    <div className={`card p-4 ${className}`}>{children}</div>
  );
};

export default Card;
