const vpc = new sst.aws.Vpc("SlcVpc");
const cluster = new sst.aws.Cluster("SlcCluster", { vpc });

export const service = new sst.aws.Service("SlcService", {
  cluster,
  image: {
    context: "./apps/web",
    dockerfile: "./apps/web/Dockerfile",
  },
  loadBalancer: {
    ports: [
      {
        listen: "80/http",
        forward: "3000/http",
      },
    ],
  },
  dev: {
    command: "npm run dev",
  },
  scaling: {
    min: 1,
    max: 1,
  },
});
