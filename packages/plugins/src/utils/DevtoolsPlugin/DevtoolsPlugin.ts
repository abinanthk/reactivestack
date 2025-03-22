import { DevtoolsClient } from "@reactivestack/devtools-client";

export class DevtoolsPlugin {
  private static _client?: DevtoolsClient;

  static get client() {
    if (!DevtoolsPlugin._client) {
      console.error(
        "Devtools is not configured DevtoolsPlugin.config({{url}})."
      );
      return;
    }

    return DevtoolsPlugin._client;
  }

  static config(uri: string) {
    DevtoolsPlugin._client = new DevtoolsClient(uri);
  }
}
