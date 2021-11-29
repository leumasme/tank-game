export default {
    root: "src",
    build: {
      chunkSizeWarningLimit: 1024 * 1024,
      outDir: "../build",
      assetsDir: "./",
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "[name][extname]",
        }
      },
    },
  };