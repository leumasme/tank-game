export default {
    root: 'src',
    build: {
      outDir: '../build',
      assetsDir: './',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        },
      },
    },
  };