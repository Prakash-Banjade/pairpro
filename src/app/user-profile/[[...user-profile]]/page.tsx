import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
    <section className="container flex justify-center">
        <UserProfile path="/user-profile" routing="path" />
    </section>
);

export default UserProfilePage;