export abstract class BaseParamsConverter<TData, TParams, TPayload> {
  public abstract fromDataToParams(data: TData): TParams;
  public abstract fromParamsToData(params: TParams): TData;
  public abstract fromDataToPayload(params: TData): TPayload;
}
