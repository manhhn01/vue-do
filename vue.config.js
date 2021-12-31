module.exports = {
  devServer: {
    proxy: {
      "^/task": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
                    @import "@/assets/style/scss/_variables.scss";
                    @import "@/assets/style/scss/_mixins.scss";
                `,
      },
    },
  },
};
