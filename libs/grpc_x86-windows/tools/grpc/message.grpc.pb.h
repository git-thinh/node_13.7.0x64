// Generated by the gRPC C++ plugin.
// If you make any local change, they will be lost.
// source: message.proto
#ifndef GRPC_message_2eproto__INCLUDED
#define GRPC_message_2eproto__INCLUDED

#include "message.pb.h"

#include <functional>
#include <grpcpp/impl/codegen/async_generic_service.h>
#include <grpcpp/impl/codegen/async_stream.h>
#include <grpcpp/impl/codegen/async_unary_call.h>
#include <grpcpp/impl/codegen/client_callback.h>
#include <grpcpp/impl/codegen/client_context.h>
#include <grpcpp/impl/codegen/completion_queue.h>
#include <grpcpp/impl/codegen/method_handler.h>
#include <grpcpp/impl/codegen/proto_utils.h>
#include <grpcpp/impl/codegen/rpc_method.h>
#include <grpcpp/impl/codegen/server_callback.h>
#include <grpcpp/impl/codegen/server_callback_handlers.h>
#include <grpcpp/impl/codegen/server_context.h>
#include <grpcpp/impl/codegen/service_type.h>
#include <grpcpp/impl/codegen/status.h>
#include <grpcpp/impl/codegen/stub_options.h>
#include <grpcpp/impl/codegen/sync_stream.h>

namespace grpc_impl {
class CompletionQueue;
class ServerCompletionQueue;
class ServerContext;
}  // namespace grpc_impl

namespace grpc {
namespace experimental {
template <typename RequestT, typename ResponseT>
class MessageAllocator;
}  // namespace experimental
}  // namespace grpc

namespace CacheService {

class CacheRequest final {
 public:
  static constexpr char const* service_full_name() {
    return "CacheService.CacheRequest";
  }
  class StubInterface {
   public:
    virtual ~StubInterface() {}
    virtual ::grpc::Status SendMessage(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest& request, ::CacheService::CacheMsgReply* response) = 0;
    std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::CacheService::CacheMsgReply>> AsyncSendMessage(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::CacheService::CacheMsgReply>>(AsyncSendMessageRaw(context, request, cq));
    }
    std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::CacheService::CacheMsgReply>> PrepareAsyncSendMessage(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReaderInterface< ::CacheService::CacheMsgReply>>(PrepareAsyncSendMessageRaw(context, request, cq));
    }
    class experimental_async_interface {
     public:
      virtual ~experimental_async_interface() {}
      virtual void SendMessage(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest* request, ::CacheService::CacheMsgReply* response, std::function<void(::grpc::Status)>) = 0;
      virtual void SendMessage(::grpc::ClientContext* context, const ::grpc::ByteBuffer* request, ::CacheService::CacheMsgReply* response, std::function<void(::grpc::Status)>) = 0;
      virtual void SendMessage(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest* request, ::CacheService::CacheMsgReply* response, ::grpc::experimental::ClientUnaryReactor* reactor) = 0;
      virtual void SendMessage(::grpc::ClientContext* context, const ::grpc::ByteBuffer* request, ::CacheService::CacheMsgReply* response, ::grpc::experimental::ClientUnaryReactor* reactor) = 0;
    };
    virtual class experimental_async_interface* experimental_async() { return nullptr; }
  private:
    virtual ::grpc::ClientAsyncResponseReaderInterface< ::CacheService::CacheMsgReply>* AsyncSendMessageRaw(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest& request, ::grpc::CompletionQueue* cq) = 0;
    virtual ::grpc::ClientAsyncResponseReaderInterface< ::CacheService::CacheMsgReply>* PrepareAsyncSendMessageRaw(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest& request, ::grpc::CompletionQueue* cq) = 0;
  };
  class Stub final : public StubInterface {
   public:
    Stub(const std::shared_ptr< ::grpc::ChannelInterface>& channel);
    ::grpc::Status SendMessage(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest& request, ::CacheService::CacheMsgReply* response) override;
    std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::CacheService::CacheMsgReply>> AsyncSendMessage(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::CacheService::CacheMsgReply>>(AsyncSendMessageRaw(context, request, cq));
    }
    std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::CacheService::CacheMsgReply>> PrepareAsyncSendMessage(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest& request, ::grpc::CompletionQueue* cq) {
      return std::unique_ptr< ::grpc::ClientAsyncResponseReader< ::CacheService::CacheMsgReply>>(PrepareAsyncSendMessageRaw(context, request, cq));
    }
    class experimental_async final :
      public StubInterface::experimental_async_interface {
     public:
      void SendMessage(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest* request, ::CacheService::CacheMsgReply* response, std::function<void(::grpc::Status)>) override;
      void SendMessage(::grpc::ClientContext* context, const ::grpc::ByteBuffer* request, ::CacheService::CacheMsgReply* response, std::function<void(::grpc::Status)>) override;
      void SendMessage(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest* request, ::CacheService::CacheMsgReply* response, ::grpc::experimental::ClientUnaryReactor* reactor) override;
      void SendMessage(::grpc::ClientContext* context, const ::grpc::ByteBuffer* request, ::CacheService::CacheMsgReply* response, ::grpc::experimental::ClientUnaryReactor* reactor) override;
     private:
      friend class Stub;
      explicit experimental_async(Stub* stub): stub_(stub) { }
      Stub* stub() { return stub_; }
      Stub* stub_;
    };
    class experimental_async_interface* experimental_async() override { return &async_stub_; }

   private:
    std::shared_ptr< ::grpc::ChannelInterface> channel_;
    class experimental_async async_stub_{this};
    ::grpc::ClientAsyncResponseReader< ::CacheService::CacheMsgReply>* AsyncSendMessageRaw(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest& request, ::grpc::CompletionQueue* cq) override;
    ::grpc::ClientAsyncResponseReader< ::CacheService::CacheMsgReply>* PrepareAsyncSendMessageRaw(::grpc::ClientContext* context, const ::CacheService::CacheMsgRequest& request, ::grpc::CompletionQueue* cq) override;
    const ::grpc::internal::RpcMethod rpcmethod_SendMessage_;
  };
  static std::unique_ptr<Stub> NewStub(const std::shared_ptr< ::grpc::ChannelInterface>& channel, const ::grpc::StubOptions& options = ::grpc::StubOptions());

  class Service : public ::grpc::Service {
   public:
    Service();
    virtual ~Service();
    virtual ::grpc::Status SendMessage(::grpc::ServerContext* context, const ::CacheService::CacheMsgRequest* request, ::CacheService::CacheMsgReply* response);
  };
  template <class BaseClass>
  class WithAsyncMethod_SendMessage : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithAsyncMethod_SendMessage() {
      ::grpc::Service::MarkMethodAsync(0);
    }
    ~WithAsyncMethod_SendMessage() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status SendMessage(::grpc::ServerContext* /*context*/, const ::CacheService::CacheMsgRequest* /*request*/, ::CacheService::CacheMsgReply* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    void RequestSendMessage(::grpc::ServerContext* context, ::CacheService::CacheMsgRequest* request, ::grpc::ServerAsyncResponseWriter< ::CacheService::CacheMsgReply>* response, ::grpc::CompletionQueue* new_call_cq, ::grpc::ServerCompletionQueue* notification_cq, void *tag) {
      ::grpc::Service::RequestAsyncUnary(0, context, request, response, new_call_cq, notification_cq, tag);
    }
  };
  typedef WithAsyncMethod_SendMessage<Service > AsyncService;
  template <class BaseClass>
  class ExperimentalWithCallbackMethod_SendMessage : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    ExperimentalWithCallbackMethod_SendMessage() {
      ::grpc::Service::experimental().MarkMethodCallback(0,
        new ::grpc_impl::internal::CallbackUnaryHandler< ::CacheService::CacheMsgRequest, ::CacheService::CacheMsgReply>(
          [this](::grpc::experimental::CallbackServerContext* context, const ::CacheService::CacheMsgRequest* request, ::CacheService::CacheMsgReply* response) { return this->SendMessage(context, request, response); }));}
    void SetMessageAllocatorFor_SendMessage(
        ::grpc::experimental::MessageAllocator< ::CacheService::CacheMsgRequest, ::CacheService::CacheMsgReply>* allocator) {
      static_cast<::grpc_impl::internal::CallbackUnaryHandler< ::CacheService::CacheMsgRequest, ::CacheService::CacheMsgReply>*>(
          ::grpc::Service::experimental().GetHandler(0))
              ->SetMessageAllocator(allocator);
    }
    ~ExperimentalWithCallbackMethod_SendMessage() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status SendMessage(::grpc::ServerContext* /*context*/, const ::CacheService::CacheMsgRequest* /*request*/, ::CacheService::CacheMsgReply* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    virtual ::grpc::experimental::ServerUnaryReactor* SendMessage(::grpc::experimental::CallbackServerContext* /*context*/, const ::CacheService::CacheMsgRequest* /*request*/, ::CacheService::CacheMsgReply* /*response*/) { return nullptr; }
  };
  typedef ExperimentalWithCallbackMethod_SendMessage<Service > ExperimentalCallbackService;
  template <class BaseClass>
  class WithGenericMethod_SendMessage : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithGenericMethod_SendMessage() {
      ::grpc::Service::MarkMethodGeneric(0);
    }
    ~WithGenericMethod_SendMessage() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status SendMessage(::grpc::ServerContext* /*context*/, const ::CacheService::CacheMsgRequest* /*request*/, ::CacheService::CacheMsgReply* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
  };
  template <class BaseClass>
  class WithRawMethod_SendMessage : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithRawMethod_SendMessage() {
      ::grpc::Service::MarkMethodRaw(0);
    }
    ~WithRawMethod_SendMessage() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status SendMessage(::grpc::ServerContext* /*context*/, const ::CacheService::CacheMsgRequest* /*request*/, ::CacheService::CacheMsgReply* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    void RequestSendMessage(::grpc::ServerContext* context, ::grpc::ByteBuffer* request, ::grpc::ServerAsyncResponseWriter< ::grpc::ByteBuffer>* response, ::grpc::CompletionQueue* new_call_cq, ::grpc::ServerCompletionQueue* notification_cq, void *tag) {
      ::grpc::Service::RequestAsyncUnary(0, context, request, response, new_call_cq, notification_cq, tag);
    }
  };
  template <class BaseClass>
  class ExperimentalWithRawCallbackMethod_SendMessage : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    ExperimentalWithRawCallbackMethod_SendMessage() {
      ::grpc::Service::experimental().MarkMethodRawCallback(0,
        new ::grpc_impl::internal::CallbackUnaryHandler< ::grpc::ByteBuffer, ::grpc::ByteBuffer>(
          [this](::grpc::experimental::CallbackServerContext* context, const ::grpc::ByteBuffer* request, ::grpc::ByteBuffer* response) { return this->SendMessage(context, request, response); }));
    }
    ~ExperimentalWithRawCallbackMethod_SendMessage() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable synchronous version of this method
    ::grpc::Status SendMessage(::grpc::ServerContext* /*context*/, const ::CacheService::CacheMsgRequest* /*request*/, ::CacheService::CacheMsgReply* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    virtual ::grpc::experimental::ServerUnaryReactor* SendMessage(::grpc::experimental::CallbackServerContext* /*context*/, const ::grpc::ByteBuffer* /*request*/, ::grpc::ByteBuffer* /*response*/) { return nullptr; }
  };
  template <class BaseClass>
  class WithStreamedUnaryMethod_SendMessage : public BaseClass {
   private:
    void BaseClassMustBeDerivedFromService(const Service* /*service*/) {}
   public:
    WithStreamedUnaryMethod_SendMessage() {
      ::grpc::Service::MarkMethodStreamed(0,
        new ::grpc::internal::StreamedUnaryHandler< ::CacheService::CacheMsgRequest, ::CacheService::CacheMsgReply>(std::bind(&WithStreamedUnaryMethod_SendMessage<BaseClass>::StreamedSendMessage, this, std::placeholders::_1, std::placeholders::_2)));
    }
    ~WithStreamedUnaryMethod_SendMessage() override {
      BaseClassMustBeDerivedFromService(this);
    }
    // disable regular version of this method
    ::grpc::Status SendMessage(::grpc::ServerContext* /*context*/, const ::CacheService::CacheMsgRequest* /*request*/, ::CacheService::CacheMsgReply* /*response*/) override {
      abort();
      return ::grpc::Status(::grpc::StatusCode::UNIMPLEMENTED, "");
    }
    // replace default version of method with streamed unary
    virtual ::grpc::Status StreamedSendMessage(::grpc::ServerContext* context, ::grpc::ServerUnaryStreamer< ::CacheService::CacheMsgRequest,::CacheService::CacheMsgReply>* server_unary_streamer) = 0;
  };
  typedef WithStreamedUnaryMethod_SendMessage<Service > StreamedUnaryService;
  typedef Service SplitStreamedService;
  typedef WithStreamedUnaryMethod_SendMessage<Service > StreamedService;
};

}  // namespace CacheService


#endif  // GRPC_message_2eproto__INCLUDED