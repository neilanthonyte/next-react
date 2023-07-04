next-agent UI
===

The next-agent project (https://bitbucket.org/samprincegroup/next-agent) provides an interface for accessing on-prem software
from within the cloud.

This directory contains the UI components used by that project to allow a user to authenticate with next-services,
and configure the integration between the agent and their on-prem software.

---

All components should be entirely stateless, relying on the NextAgentContext for all data access.
These components will only be rendered on screen while the user is configuring the agent, and therefore should contain no logic, data storage or session storage.

