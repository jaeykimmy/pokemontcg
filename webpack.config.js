export const resolve = {
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  fallback: {
    url: require.resolve("url/"),
    fs: require.resolve("fs-extra"),
    assert: require.resolve("assert/"),
    util: require.resolve("util/"),
    dns: require.resolve("dns-sync"),
    net: require.resolve("net"),
    tls: require.resolve("tls"),
    "pg-native": require.resolve("pg-native"),
  },
};
