export abstract class BaseParamsConverter {
  public abstract fromDataToParams(data: Record<string, any>): Record<string, any>;
  public abstract fromParamsToData(params: Record<string, any>): Record<string, any>;
  public abstract fromDataToPayload(params: Record<string, any>): Record<string, any>;
}
