import RegisterAccount from "./RegisterAccount";
import SignIn from "./SignIn";

function Account() {
  return (
    <>
      {true
        ? <RegisterAccount />
        : <SignIn />
      }
    </>
  );
}

export default Account;
