import { UserIcon } from "@heroicons/react/24/solid";

const Modal = ({ userProfile }) => {
	const { country, display_name, email, external_urls, followers, id, product, images } = userProfile;
	const bigImage = images[1].url;

	const ModalInfo = ({ icon, field }) => {
		return (
			<div className="flex flex-col md:flex-row items-center gap-2">
				{icon}
				<p className="text-sm">{field}</p>
			</div>
		);
	};

	return (
		<dialog id="my_modal_2" className="modal">
			<div className="modal-box flex flex-col md:flex-row justify-center items-center gap-8">
				<div className="avatar">
					<div className="w-36 md:w-52 rounded-xl">
						<img src={bigImage} />
					</div>
				</div>
				<div className="text-center md:text-left">
					<h3 className="font-bold text-lg">Hello {display_name}!</h3>
					<div className="mt-8 flex flex-col gap-4">
						<ModalInfo icon={<UserIcon className="w-6 inline-block" />} field={email} />
						<ModalInfo icon={<UserIcon className="w-6 inline-block" />} field={email} />
						<ModalInfo icon={<UserIcon className="w-6 inline-block" />} field={email} />
						<ModalInfo icon={<UserIcon className="w-6 inline-block" />} field={email} />
					</div>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
};

export default Modal;
