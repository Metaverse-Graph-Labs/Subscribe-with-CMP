import { SignIn } from '@clerk/nextjs'

const SignInPage = () => (
	<div className="my-auto">
		<div className="mt-[-164px]">
			<SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
		</div>
	</div>
)

export default SignInPage
