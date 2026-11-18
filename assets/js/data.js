// Single source of truth: the page and the terminal both render from this.
window.DATA = {
  name: "Nika Tolordava",
  short: "Nika",
  role: "Support Engineer (L2) · moving into Linux, infrastructure and SRE",
  place: "Tbilisi, Georgia",
  email: "nikoloztolordava10@gmail.com",
  links: {
    github: "https://github.com/Nitaru",
    linkedin: "https://www.linkedin.com/in/nika-tolordava-2b82a6231",
    email: "mailto:nikoloztolordava10@gmail.com",
  },
  summary:
    "I investigate incidents on production cloud and storage clusters for a living, " +
    "and I build the infrastructure I'd want to be on call for in my own time.",
  about: [
    "I'm an L2 support engineer at Virtuozzo in Tbilisi and a Computer Science student at Ilia State University, graduating in 2027. Since March 2026 I work on production clusters built on Linux, KVM and OpenStack: reading logs and kernel messages over SSH, finding root causes from evidence, and handing developers a timeline that separates what is verified from what is not.",
    "Outside of work I build hands-on labs to turn that troubleshooting experience into infrastructure skills: hardened Linux servers, Kubernetes platforms, cloud infrastructure as code, CI/CD and monitoring. Every project here runs from one command and ships with tests or scripted demos that prove its claims, including the mistakes I hit along the way.",
  ],
  looking:
    "Linux administration, infrastructure operations and SRE / DevOps roles where I can keep growing by doing.",
  experience: [
    {
      when: "Mar 2026 – now",
      title: "Support Engineer (L2)",
      org: "Virtuozzo · Tbilisi",
      points: [
        "Investigate incidents on production cloud and storage clusters: logs, services, kernel messages, hardware health and networking.",
        "Work with KVM/libvirt VMs, OpenStack (Nova, Neutron with Open vSwitch, Cinder), a distributed storage cluster and the platform's alerting.",
        "Escalate to developers with a clear timeline, and write up recurring issues so the next person does not rediscover them.",
      ],
    },
    {
      when: "Graduating 2027",
      title: "BSc, Computer Science",
      org: "Ilia State University · Tbilisi",
      points: ["Studying alongside full-time work. Currently working toward RHCSA and CCNA."],
    },
  ],
  principles: [
    ["Evidence first", "Read-only checks before any change."],
    ["Verified vs guessed", "Say which is which, every time."],
    ["Write it down", "So nobody has to rediscover it."],
    ["Prove it", "Every project has a test or a demo that can fail."],
  ],
  // level: work = used in my day job, built = used in my projects, learning = in progress
  skills: [
    { n: "Linux", g: "Linux & troubleshooting", l: "work" },
    { n: "systemd", g: "Linux & troubleshooting", l: "work" },
    { n: "journalctl", g: "Linux & troubleshooting", l: "work" },
    { n: "SMART / NVMe health", g: "Linux & troubleshooting", l: "work" },
    { n: "KVM / libvirt", g: "Virtualization & cloud", l: "work" },
    { n: "OpenStack", g: "Virtualization & cloud", l: "work" },
    { n: "AWS", g: "Virtualization & cloud", l: "built" },
    { n: "Open vSwitch", g: "Networking", l: "work" },
    { n: "VLANs & bonds", g: "Networking", l: "work" },
    { n: "WireGuard", g: "Networking", l: "built" },
    { n: "CCNA", g: "Networking", l: "learning" },
    { n: "Bash", g: "Automation & IaC", l: "work" },
    { n: "Ansible", g: "Automation & IaC", l: "built" },
    { n: "Terraform", g: "Automation & IaC", l: "built" },
    { n: "Git", g: "Automation & IaC", l: "work" },
    { n: "Docker", g: "Containers & orchestration", l: "built" },
    { n: "Kubernetes", g: "Containers & orchestration", l: "built" },
    { n: "Helm", g: "Containers & orchestration", l: "built" },
    { n: "Calico", g: "Containers & orchestration", l: "built" },
    { n: "Argo CD", g: "Containers & orchestration", l: "built" },
    { n: "Traefik", g: "Containers & orchestration", l: "built" },
    { n: "Consul", g: "Containers & orchestration", l: "built" },
    { n: "GitHub Actions", g: "CI/CD & monitoring", l: "built" },
    { n: "Prometheus", g: "CI/CD & monitoring", l: "built" },
    { n: "Grafana", g: "CI/CD & monitoring", l: "built" },
    { n: "Loki", g: "CI/CD & monitoring", l: "built" },
    { n: "Nginx", g: "CI/CD & monitoring", l: "built" },
    { n: "fail2ban / UFW", g: "Security", l: "built" },
    { n: "Checkov", g: "Security", l: "built" },
    { n: "Trivy", g: "Security", l: "built" },
    { n: "Kyverno", g: "Security", l: "built" },
    { n: "Python", g: "Languages", l: "learning" },
    { n: "Node.js", g: "Languages", l: "built" },
    { n: "RHCSA", g: "Certifications", l: "learning" },
  ],
  projects: [
    {
      id: "kubernetes",
      brand: "#326CE5",
      title: "Kubernetes Hands-On",
      tagline: "A production-style platform on a local 3-node cluster",
      repo: "https://github.com/Nitaru/Kubernetes-Hands-On",
      summary:
        "Traefik ingress, a Helm chart, HPA autoscaling, zero-downtime rollouts, hardened pods, a Redis StatefulSet and default-deny NetworkPolicies enforced by Calico. On top of that: Prometheus and Grafana with SLO burn-rate alerts, Trivy scans that fail CI, Kyverno admission policies, and Argo CD deploying the app from Git. One script builds all of it; smoke tests and CI check it in both install modes.",
      skills: ["Kubernetes", "Helm", "Argo CD", "Prometheus", "Kyverno", "Trivy", "Calico", "Traefik", "Docker", "GitHub Actions"],
      metrics: [
        ["55 / 55", "requests succeeded while every pod was replaced"],
        ["2 → 8", "replicas under load, then back down"],
        ["35", "smoke-test assertions"],
        ["29 → 0", "HIGH and CRITICAL image CVE findings after the first Trivy scan"],
      ],
      lesson:
        "The chart keeps the Redis password across upgrades with Helm's lookup, but Argo CD renders with helm template, which cannot read the cluster, so every sync would have invented a new password. I told Argo to ignore that one field and checked it by hashing the password across two real Git-driven syncs. My first test of this was wrong too: it silently dropped the sync option I was testing.",
      diagram: "k8s",
    },
    {
      id: "aws",
      brand: "#7B42BC",
      title: "AWS Terraform Hands-On",
      tagline: "A VPC, a hardened bastion and an Auto Scaling web tier, applied, tested and destroyed",
      repo: "https://github.com/Nitaru/AWS-Terraform-Hands-On",
      summary:
        "Terraform modules for a VPC with public and private subnets, a bastion limited to one admin address, and Auto Scaling web servers behind an Application Load Balancer. Remote state in S3, Checkov and tflint in CI, applied to a real account, verified from outside, then destroyed with nothing left behind.",
      skills: ["Terraform", "AWS", "Checkov", "GitHub Actions", "Linux", "Bash", "fail2ban / UFW"],
      metrics: [
        ["37", "resources applied, then destroyed in 1m42s"],
        ["9 / 9", "checks passed against the live stack"],
        ["102 s", "to restore capacity after I killed an instance"],
        ["5.2%", "of requests failed during that recovery"],
      ],
      lesson:
        "My first check for \"web servers have no public IP\" could never fail: the query dropped null values, so the loop ran zero times and passed. I rewrote it to require the instances it expects. The recovery test also showed the stack heals but is not zero-downtime when an instance dies abruptly, and the README says so.",
      diagram: "aws",
    },
    {
      id: "linux",
      brand: "#EE0000",
      title: "Linux Hands-On",
      tagline: "A hardened bastion, VPN and private server, all built by Ansible",
      repo: "https://github.com/Nitaru/Linux-Hands-On",
      summary:
        "Two Ubuntu VMs configured only by Ansible: key-only SSH, UFW, fail2ban, a bastion with ProxyJump, a WireGuard VPN with NAT, and a SHA-256 file integrity checker on a systemd timer. It merges five roadmap.sh projects into one environment.",
      skills: ["Linux", "Ansible", "systemd", "WireGuard", "fail2ban / UFW", "Bash"],
      metrics: [
        ["42", "security checks in the verify script"],
        ["0", "changes on the second Ansible run"],
        ["4", "scripted attack and proof demos"],
      ],
      lesson:
        "My own verify script locked me out: ufw's rate limit rejects new SSH connections, and every retry restarted the window. The fix was SSH connection multiplexing.",
      diagram: "linux",
    },
    {
      id: "devops",
      brand: "#2496ED",
      title: "DevOps Hands-On",
      tagline: "Four classic DevOps projects, each runnable with Docker Compose",
      repo: "https://github.com/Nitaru/Nitaru_DevOps_Shenanigans",
      summary:
        "Service discovery with Consul, a five-service Docker app built with best practices, zero-downtime blue-green deployments with CI/CD, and a full Prometheus, Grafana and Loki monitoring stack with custom exporters and alerting. Each project has a test that builds it and checks what its README claims, including a real alert firing and resolving.",
      skills: ["Docker", "Consul", "Nginx", "GitHub Actions", "Prometheus", "Grafana", "Loki", "Bash", "Node.js"],
      metrics: [
        ["4", "self-contained projects"],
        ["83", "end-to-end checks across three of them, plus a zero-downtime test for the fourth"],
      ],
      parts: [
        ["Service Discovery", "Consul registry, health checks, a gateway that load-balances healthy instances."],
        ["Multi-Service Docker", "React, Express, MongoDB, Redis and Nginx: multi-stage builds, isolated networks, secrets."],
        ["Blue-Green Deployment", "Deploy to the idle colour, smoke test, switch traffic, instant rollback."],
        ["Monitoring Stack", "Prometheus, Grafana, Loki, exporters, recording and alerting rules."],
      ],
    },
  ],
  startHere: {
    intro: "Short on time? Read these in this order. Each one runs from a single command, has a test or demo that can fail, and says what it does not cover.",
    steps: [
      {
        id: "aws", brand: "#7B42BC", title: "AWS Terraform Hands-On", why: "Read this first",
        story: "The smallest complete story: a real AWS stack applied, checked from outside (9 of 9 checks), broken on purpose by killing an instance, and destroyed with nothing left. It also shows me catching my own bad test, a check that could never fail.",
        read: [["Measured results", "https://github.com/Nitaru/AWS-Terraform-Hands-On#measured-results"], ["What went wrong", "https://github.com/Nitaru/AWS-Terraform-Hands-On#things-that-went-wrong-and-what-they-taught-me"]],
      },
      {
        id: "kubernetes", brand: "#326CE5", title: "Kubernetes Hands-On", why: "Then this, for depth",
        story: "A platform built in layers: ingress, autoscaling, SLO alerts, image scanning, admission policies and GitOps. Start at the proof: 55 of 55 requests succeeded while every pod was replaced, and a password bug I only found by checking two real Git-driven syncs.",
        read: [["Prove it", "https://github.com/Nitaru/Kubernetes-Hands-On#prove-it"], ["GitOps", "https://github.com/Nitaru/Kubernetes-Hands-On#gitops"]],
      },
      {
        id: "linux", brand: "#EE0000", title: "Linux Hands-On", why: "For the Linux and security side",
        story: "Two VMs configured only by Ansible: key-only SSH, a bastion, a WireGuard VPN and a file integrity checker. Run the scripted attacks, then read the threat model, which lists what the hardening does not cover and the gaps I would fix first.",
        read: [["See it work", "https://github.com/Nitaru/Linux-Hands-On#see-it-work"], ["Threat model", "https://github.com/Nitaru/Linux-Hands-On/blob/main/docs/threat-model.md"]],
      },
      {
        id: "devops", brand: "#2496ED", title: "DevOps Hands-On", why: "For breadth",
        story: "Four smaller projects, each runnable with Docker Compose: service discovery, a five-service app, blue-green deployment and a monitoring stack. Three have end-to-end test scripts (83 checks between them) and the fourth has a zero-downtime test.",
        read: [["Tests", "https://github.com/Nitaru/Nitaru_DevOps_Shenanigans#tests"]],
      },
    ],
  },

  diagrams: {
    k8s: {
      w: 720, h: 250,
      nodes: [
        { id: "u", t: "Browser", x: 10, y: 95, w: 90, h: 44, d: "Anyone with the URL. Requests enter on a published host port." },
        { id: "i", t: "Traefik", x: 150, y: 95, w: 100, h: 44, d: "Ingress controller, two replicas. Routes by hostname and is the only thing allowed to call the API." },
        { id: "a", t: "shop-api ×2–8", x: 310, y: 95, w: 130, h: 44, d: "Node.js API. Separate startup, readiness and liveness probes, graceful SIGTERM, spread across nodes, non-root with a read-only filesystem." },
        { id: "r", t: "Redis", x: 520, y: 95, w: 100, h: 44, d: "StatefulSet with a PersistentVolumeClaim. The password comes from a Secret generated once by Helm." },
        { id: "h", t: "HPA", x: 330, y: 12, w: 90, h: 38, d: "Scales the API on CPU from 2 to 8 replicas. Scale-up is fast, scale-down is gradual." },
        { id: "m", t: "metrics-server", x: 450, y: 12, w: 120, h: 38, d: "Feeds CPU numbers to the HPA and to kubectl top." },
        { id: "g", t: "Argo CD", x: 170, y: 12, w: 100, h: 38, d: "Keeps the shop namespace equal to Git with automated sync, prune and self-heal. A NetworkPolicy deleted by hand comes back within seconds, and a commit is deployed without anyone running helm or kubectl." },
        { id: "p", t: "Prometheus", x: 590, y: 12, w: 110, h: 38, d: "Scrapes the API through a ServiceMonitor, with Grafana and Alertmanager. Two SLOs (99% of requests not 5xx, 95% under 500 ms) alert on multiwindow burn rates, and the dashboard ships as code with the chart." },
        { id: "k", t: "Kyverno", x: 10, y: 190, w: 110, h: 40, d: "Admission policies for the shop namespace: pods that are not hardened, use :latest or have no limits are refused at kubectl apply, and the same rules protect Deployments." },
        { id: "c", t: "Calico enforces default-deny NetworkPolicies", x: 150, y: 190, w: 470, h: 40, d: "kind's default CNI ignores NetworkPolicies, so Calico replaces it. Only ingress to API and API to Redis (plus DNS) are allowed.", band: true },
      ],
      edges: [["u", "i"], ["i", "a"], ["a", "r"], ["h", "a"], ["m", "h"], ["g", "a"]],
    },
    linux: {
      w: 720, h: 250,
      nodes: [
        { id: "u", t: "Your laptop", x: 10, y: 40, w: 100, h: 44, d: "Connects with an SSH key only. Password logins are disabled everywhere." },
        { id: "v", t: "VPN client", x: 10, y: 150, w: 100, h: 44, d: "A WireGuard peer with a split tunnel: only the VPN subnet and the private server go through it." },
        { id: "b", t: "Bastion", x: 240, y: 95, w: 130, h: 44, d: "The only public entry. Hardened sshd, fail2ban, UFW rate limiting, WireGuard endpoint with NAT, and PermitOpen limited to the private server's sshd." },
        { id: "p", t: "Private server", x: 500, y: 95, w: 130, h: 44, d: "nginx behind a firewall that accepts traffic only from the bastion. Reached with ProxyJump." },
        { id: "f", t: "integrity-check", x: 500, y: 200, w: 130, h: 36, d: "A Bash tool that stores SHA-256 baselines and verifies them from a sandboxed systemd timer. Tampering fails the unit and logs to the journal." },
        { id: "a", t: "Ansible", x: 240, y: 12, w: 130, h: 36, d: "Configures both machines. A second run changes nothing." },
      ],
      edges: [["u", "b"], ["v", "b"], ["b", "p"], ["a", "b"], ["p", "f"]],
    },
    aws: {
      w: 720, h: 250,
      nodes: [
        { id: "u", t: "Internet", x: 10, y: 40, w: 90, h: 44, d: "Anyone with the load balancer's address. Only port 80 is open to them." },
        { id: "l", t: "ALB", x: 170, y: 40, w: 100, h: 44, d: "Application Load Balancer across two availability zones. Health-checks /health every 10 seconds and sends traffic only to healthy instances." },
        { id: "w", t: "Web ASG ×2–4", x: 400, y: 95, w: 140, h: 44, d: "Auto Scaling Group in private subnets, no public IPs, IMDSv2 only, encrypted volumes. Scales to hold CPU near 50% and replaces failed instances." },
        { id: "a", t: "Admin, one IP", x: 10, y: 150, w: 100, h: 44, d: "The only address allowed to SSH in. The module refuses 0.0.0.0/0." },
        { id: "b", t: "Bastion", x: 170, y: 150, w: 100, h: 44, d: "Key-only SSH, no root login, fail2ban. The web tier accepts SSH only from this security group." },
        { id: "n", t: "NAT gateway", x: 590, y: 95, w: 110, h: 44, d: "Outbound-only internet for the private instances, for package installs. One gateway to keep the demo cheap." },
        { id: "f", t: "Flow logs · S3 remote state with locking · Checkov and tflint in CI", x: 170, y: 205, w: 530, h: 34, d: "Flow logs go to CloudWatch for a year. State lives in a versioned, encrypted bucket. CI runs fmt, validate, Checkov and tflint on every push.", band: true },
      ],
      edges: [["u", "l"], ["l", "w"], ["a", "b"], ["b", "w"], ["w", "n"]],
    },
  },
};
