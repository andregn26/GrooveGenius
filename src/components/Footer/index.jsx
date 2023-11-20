import { Github, IconHeart, Instagram, Linkedin, Website } from "../Icons";

const Footer = () => {
	return (
		<footer className="footer flex flex-col gap-6 xs:flex-row xs:justify-between  items-center p-4 bg-base-300 text-neutral-content">
			<aside className="items-center">
				<p>
					Made with{" "}
					<span>
						<IconHeart />
					</span>{" "}
					by AG
				</p>
			</aside>
			<nav className="flex gap-4 md:place-self-center md:justify-self-end">
				<a href="https://www.linkedin.com/in/andrengregorio/" target="_blank" rel="noreferrer">
					<Linkedin />
				</a>
				<a href="https://www.andregregorio.pt/" target="_blank" rel="noreferrer">
					<Website />
				</a>
				<a href="https://github.com/andregn26" target="_blank" rel="noreferrer">
					<Github />
				</a>
				<a href="https://www.instagram.com/andregn33/" target="_blank" rel="noreferrer">
					<Instagram />
				</a>
			</nav>
		</footer>
	);
};

export default Footer;
