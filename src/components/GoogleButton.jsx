import React from "react";

class GoogleButton extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const { mode = "signin" } = this.props;

      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: (response) => {
          console.log("Token:", response.credential);
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        {
          theme: "outline",
          size: "large",
          text: mode === "signup" ? "signup_with" : "signin_with", // optional
        }
      );

      if (mode === "signup") {
        window.google.accounts.id.prompt(); // shows One Tap if enabled
      }
    };

    document.body.appendChild(script);
  }

  render() {
    return <div id="g_id_signin"></div>;
  }
}
export default GoogleButton;
