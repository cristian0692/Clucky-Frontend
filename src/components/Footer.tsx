const Footer = () => {
    return(
        <div className="bg-green-600 py-10">
            <div className="container mx-auto flex flex-col gap-4 md:flex-row justify-between items-center px-7">
                <span className="text-3xl font-bold tracking-tight text-white">
                        Clucky.com 
                </span>
                <span className="flex gap-5 text-white font-bold tracking-tight">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </span>
            </div>
        </div>
  );
}

export default Footer;