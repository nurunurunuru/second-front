const Blog = () => {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 dark:text-white duration-200">
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-800 dark:text-white drop-shadow-md">
        Welcome to Our Blog
      </h1>
      
      <div className="max-w-3xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 transition duration-300 ease-in-out">
            1. What are the key differences between laptops and desktops?
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Laptops are portable computers with integrated screens and keyboards, making them ideal for mobility. Desktops, on the other hand, are stationary, offering more power, expandability, and ease of repair or upgrade, suitable for dedicated workspaces.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 transition duration-300 ease-in-out">
            2. How has mobile phone technology evolved in recent years?
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Mobile phones have transformed from simple communication devices to advanced smartphones, integrating features like high-resolution cameras, AI, biometrics, and extensive app ecosystems. They've become essential tools for communication, productivity, and entertainment.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 transition duration-300 ease-in-out">
            3. What should you consider when buying a television?
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            When purchasing a television, consider factors such as screen size, resolution (4K or 8K), display technology (LED, OLED, QLED), refresh rate, smart features, and connectivity options. The right choice depends on your space, budget, and viewing preferences.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 transition duration-300 ease-in-out">
            4. Are laptops suitable for gaming compared to desktop PCs?
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Gaming laptops have come a long way, with powerful GPUs and high-refresh-rate screens, making them viable for gaming. However, desktops still hold an edge in performance, upgradeability, and cooling, which are critical for high-end gaming.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blog;
