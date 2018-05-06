namespace OneCore.Core.ViewModel
{
    public class ResponseViewModel<T>
    {
        public string Message { get; set; }

        public bool Success { get; set; }

        public T Objeto { get; set; }
    }
}
