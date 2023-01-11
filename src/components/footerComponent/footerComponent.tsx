export default function footerComponent() {
  return (
    <div className="flex w-screen flex-col items-center">
      <h2 className=" font-thin text-babbleGray">
        © {new Date().getFullYear()} Babble Stream Integrations
      </h2>
    </div>
  );
}
