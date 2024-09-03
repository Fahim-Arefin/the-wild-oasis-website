import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
// import { NextResponse } from "next/server";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // authorized({ auth, request }) {
    //   console.log("request from authorized function", request.nextUrl.pathname);
    //   if (auth?.user) {
    //     return true;
    //   } else {
    //     const url = new URL(request.url);
    //     url.pathname = "/login";
    //     url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    //     return NextResponse.redirect(url);
    //   }
    // },
    authorized({ auth, request }) {
      console.log("request from authorized function", request.nextUrl.pathname);
      return auth?.user ? true : false;
    },

    /* 
       - This callback is triggered when a user signs in but before the session is created.
       - It then returns true to indicate that the sign-in process should continue.
       - If an error occurs, it catches the error and returns false to stop the sign-in process.

       -  user: The user object returned by the authentication provider (google,facebook,github etc.). 
          accout: The account information, typically contains provider-specific details.
          profile: The profile information, often contains user data like name, email, etc.
    */
    async signIn({ user, accout, profile }) {
      try {
        // User has been authenticated by your provider
        // But Session has not been initialized yet
        // Now, you can save user data to your database
        console.log("User signed in", user);

        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({
            fullName: user.name,
            email: user.email,
          });
        }
        return true;
      } catch {
        return false;
      }
    },
    /* 
       - The session callback is invoked whenever a session is being checked or created. 
       - It allows you to customize the session object that will be sent to the client. 
       - This is especially useful when you want to add additional information to the session, like user roles, permissions, or custom fields like a guestId in this case.
    */
    async session({ session, user }) {
      // session is a session object that will be sent to the client
      // structure is the same as the session object passed to the client
      const currentGuest = await getGuest(session.user.email);
      session.user.guestId = currentGuest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
