import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => (
	<div className="mt-10">
		<UserProfile path="/user" routing="path" />;
	</div>
)

export default UserProfilePage
