interface Props {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex justify-center items-center bg-sky-500">
      {children}
    </div>
  );
};
export default AuthLayout;
