function AppContainer({ children }) {
  return (
    <div
      className="
      w-4xl
      mx-auto
      pt-25
      flex
      flex-col
      min-h-screen
    text-zinc-700"
    >
      {children}
    </div>
  );
}

export default AppContainer;
