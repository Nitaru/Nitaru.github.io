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
    "Outside of work I build hands-on labs to turn that troubleshooting experience into infrastructure skills: hardened Linux servers, Kubernetes platforms, CI/CD and monitoring. Every project here runs from one command and ships with tests or scripted demos that prove its claims, including the mistakes I hit along the way.",
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
    { n: "Traefik", g: "Containers & orchestration", l: "built" },
    { n: "Consul", g: "Containers & orchestration", l: "built" },
    { n: "GitHub Actions", g: "CI/CD & monitoring", l: "built" },
    { n: "Prometheus", g: "CI/CD & monitoring", l: "built" },
    { n: "Grafana", g: "CI/CD & monitoring", l: "built" },
    { n: "Loki", g: "CI/CD & monitoring", l: "built" },
    { n: "Nginx", g: "CI/CD & monitoring", l: "built" },
    { n: "fail2ban / UFW", g: "Security", l: "built" },
    { n: "Python", g: "Languages", l: "learning" },
    { n: "Node.js", g: "Languages", l: "built" },
    { n: "RHCSA", g: "Certifications", l: "learning" },
  ],
  projects: [
    {
      id: "kubernetes",
      title: "Kubernetes Hands-On",
      tagline: "A production-style platform on a local 3-node cluster",
      repo: "https://github.com/Nitaru/Kubernetes-Hands-On",
      summary:
        "Traefik ingress, a Helm chart, HPA autoscaling, zero-downtime rollouts, a PodDisruptionBudget, hardened pods, a Redis StatefulSet and default-deny NetworkPolicies enforced by Calico. One script builds all of it; smoke tests and CI check it.",
      skills: ["Kubernetes", "Helm", "Docker", "Calico", "Traefik", "GitHub Actions", "Linux"],
      metrics: [
        ["55 / 55", "requests succeeded while every pod was replaced"],
        ["2 → 8", "replicas under load, then back down"],
        ["17", "smoke-test assertions"],
      ],
      lesson:
        "My first network-policy test proved nothing: the probe pod could exit before kubectl attached, and Redis does not speak HTTP. I rebuilt it with a control target and verified it both ways, policies off and policies on.",
      diagram: "k8s",
    },
    {
      id: "linux",
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
      title: "DevOps Hands-On",
      tagline: "Four classic DevOps projects, each runnable with Docker Compose",
      repo: "https://github.com/Nitaru/Nitaru_DevOps_Shenanigans",
      summary:
        "Service discovery with Consul, a five-service Docker app built with best practices, zero-downtime blue-green deployments with CI/CD, and a full Prometheus, Grafana and Loki monitoring stack with custom exporters and alerting.",
      skills: ["Docker", "Consul", "Nginx", "GitHub Actions", "Prometheus", "Grafana", "Loki", "Bash", "Node.js"],
      metrics: [
        ["4", "self-contained projects"],
        ["1", "command to run each"],
      ],
      parts: [
        ["Service Discovery", "Consul registry, health checks, a gateway that load-balances healthy instances."],
        ["Multi-Service Docker", "React, Express, MongoDB, Redis and Nginx: multi-stage builds, isolated networks, secrets."],
        ["Blue-Green Deployment", "Deploy to the idle colour, smoke test, switch traffic, instant rollback."],
        ["Monitoring Stack", "Prometheus, Grafana, Loki, exporters, recording and alerting rules."],
      ],
    },
  ],
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
        { id: "c", t: "Calico enforces default-deny NetworkPolicies", x: 150, y: 190, w: 470, h: 40, d: "kind's default CNI ignores NetworkPolicies, so Calico replaces it. Only ingress to API and API to Redis (plus DNS) are allowed.", band: true },
      ],
      edges: [["u", "i"], ["i", "a"], ["a", "r"], ["h", "a"], ["m", "h"]],
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
  },
};
