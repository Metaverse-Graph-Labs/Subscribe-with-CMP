import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => (
	<div className="my-auto">
		<div className="mt-[-164px]">
			<SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
		</div>
	</div>
)

export default SignUpPage
