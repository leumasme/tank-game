export default {
    root: "src",
    build: {
      chunkSizeWarningLimit: 1024 * 1024,
      outDir: "../build",
      assetsDir: "./",
      emptyOutDir: false,
      rollupOptions: {
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "[name][extname]",
        }
      },
    },
  };