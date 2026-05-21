const LoadingSpinner = () => {

  return (

    <div
      className="
      h-screen
      flex
      justify-center
      items-center
    "
    >

      <div
        className="
        w-16
        h-16
        border-4
        border-black
        border-t-transparent
        rounded-full
        animate-spin
      "
      />

    </div>
  );
};

export default LoadingSpinner;