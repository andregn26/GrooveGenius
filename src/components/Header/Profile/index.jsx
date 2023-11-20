import Modal from "./Modal";

const Profile = ({ userProfile }) => {
	// console.log("userProfile -->", userProfile);
	const { display_name, email, images } = userProfile;
	const smallImage = images[0].url;

	return (
		<>
			<div className="flex gap-8">
				<div className="hidden md:inline-block text-right">
					<p className="text-sm mb-1">{display_name}</p>
					<p className="text-xs">{email}</p>
				</div>
				<button className="avatar" onClick={() => document.getElementById("my_modal_2").showModal()}>
					<div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
						<img src={smallImage} />
					</div>
				</button>
			</div>

			<Modal userProfile={userProfile} />
		</>
	);
};

export default Profile;
