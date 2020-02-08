// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: message.proto

#ifndef GOOGLE_PROTOBUF_INCLUDED_message_2eproto
#define GOOGLE_PROTOBUF_INCLUDED_message_2eproto

#include <limits>
#include <string>

#include <google/protobuf/port_def.inc>
#if PROTOBUF_VERSION < 3011000
#error This file was generated by a newer version of protoc which is
#error incompatible with your Protocol Buffer headers. Please update
#error your headers.
#endif
#if 3011003 < PROTOBUF_MIN_PROTOC_VERSION
#error This file was generated by an older version of protoc which is
#error incompatible with your Protocol Buffer headers. Please
#error regenerate this file with a newer version of protoc.
#endif

#include <google/protobuf/port_undef.inc>
#include <google/protobuf/io/coded_stream.h>
#include <google/protobuf/arena.h>
#include <google/protobuf/arenastring.h>
#include <google/protobuf/generated_message_table_driven.h>
#include <google/protobuf/generated_message_util.h>
#include <google/protobuf/inlined_string_field.h>
#include <google/protobuf/metadata.h>
#include <google/protobuf/generated_message_reflection.h>
#include <google/protobuf/message.h>
#include <google/protobuf/repeated_field.h>  // IWYU pragma: export
#include <google/protobuf/extension_set.h>  // IWYU pragma: export
#include <google/protobuf/unknown_field_set.h>
// @@protoc_insertion_point(includes)
#include <google/protobuf/port_def.inc>
#define PROTOBUF_INTERNAL_EXPORT_message_2eproto
PROTOBUF_NAMESPACE_OPEN
namespace internal {
class AnyMetadata;
}  // namespace internal
PROTOBUF_NAMESPACE_CLOSE

// Internal implementation detail -- do not use these members.
struct TableStruct_message_2eproto {
  static const ::PROTOBUF_NAMESPACE_ID::internal::ParseTableField entries[]
    PROTOBUF_SECTION_VARIABLE(protodesc_cold);
  static const ::PROTOBUF_NAMESPACE_ID::internal::AuxillaryParseTableField aux[]
    PROTOBUF_SECTION_VARIABLE(protodesc_cold);
  static const ::PROTOBUF_NAMESPACE_ID::internal::ParseTable schema[2]
    PROTOBUF_SECTION_VARIABLE(protodesc_cold);
  static const ::PROTOBUF_NAMESPACE_ID::internal::FieldMetadata field_metadata[];
  static const ::PROTOBUF_NAMESPACE_ID::internal::SerializationTable serialization_table[];
  static const ::PROTOBUF_NAMESPACE_ID::uint32 offsets[];
};
extern const ::PROTOBUF_NAMESPACE_ID::internal::DescriptorTable descriptor_table_message_2eproto;
namespace CacheService {
class CacheMsgReply;
class CacheMsgReplyDefaultTypeInternal;
extern CacheMsgReplyDefaultTypeInternal _CacheMsgReply_default_instance_;
class CacheMsgRequest;
class CacheMsgRequestDefaultTypeInternal;
extern CacheMsgRequestDefaultTypeInternal _CacheMsgRequest_default_instance_;
}  // namespace CacheService
PROTOBUF_NAMESPACE_OPEN
template<> ::CacheService::CacheMsgReply* Arena::CreateMaybeMessage<::CacheService::CacheMsgReply>(Arena*);
template<> ::CacheService::CacheMsgRequest* Arena::CreateMaybeMessage<::CacheService::CacheMsgRequest>(Arena*);
PROTOBUF_NAMESPACE_CLOSE
namespace CacheService {

// ===================================================================

class CacheMsgRequest :
    public ::PROTOBUF_NAMESPACE_ID::Message /* @@protoc_insertion_point(class_definition:CacheService.CacheMsgRequest) */ {
 public:
  CacheMsgRequest();
  virtual ~CacheMsgRequest();

  CacheMsgRequest(const CacheMsgRequest& from);
  CacheMsgRequest(CacheMsgRequest&& from) noexcept
    : CacheMsgRequest() {
    *this = ::std::move(from);
  }

  inline CacheMsgRequest& operator=(const CacheMsgRequest& from) {
    CopyFrom(from);
    return *this;
  }
  inline CacheMsgRequest& operator=(CacheMsgRequest&& from) noexcept {
    if (GetArenaNoVirtual() == from.GetArenaNoVirtual()) {
      if (this != &from) InternalSwap(&from);
    } else {
      CopyFrom(from);
    }
    return *this;
  }

  static const ::PROTOBUF_NAMESPACE_ID::Descriptor* descriptor() {
    return GetDescriptor();
  }
  static const ::PROTOBUF_NAMESPACE_ID::Descriptor* GetDescriptor() {
    return GetMetadataStatic().descriptor;
  }
  static const ::PROTOBUF_NAMESPACE_ID::Reflection* GetReflection() {
    return GetMetadataStatic().reflection;
  }
  static const CacheMsgRequest& default_instance();

  static void InitAsDefaultInstance();  // FOR INTERNAL USE ONLY
  static inline const CacheMsgRequest* internal_default_instance() {
    return reinterpret_cast<const CacheMsgRequest*>(
               &_CacheMsgRequest_default_instance_);
  }
  static constexpr int kIndexInFileMessages =
    0;

  friend void swap(CacheMsgRequest& a, CacheMsgRequest& b) {
    a.Swap(&b);
  }
  inline void Swap(CacheMsgRequest* other) {
    if (other == this) return;
    InternalSwap(other);
  }

  // implements Message ----------------------------------------------

  inline CacheMsgRequest* New() const final {
    return CreateMaybeMessage<CacheMsgRequest>(nullptr);
  }

  CacheMsgRequest* New(::PROTOBUF_NAMESPACE_ID::Arena* arena) const final {
    return CreateMaybeMessage<CacheMsgRequest>(arena);
  }
  void CopyFrom(const ::PROTOBUF_NAMESPACE_ID::Message& from) final;
  void MergeFrom(const ::PROTOBUF_NAMESPACE_ID::Message& from) final;
  void CopyFrom(const CacheMsgRequest& from);
  void MergeFrom(const CacheMsgRequest& from);
  PROTOBUF_ATTRIBUTE_REINITIALIZES void Clear() final;
  bool IsInitialized() const final;

  size_t ByteSizeLong() const final;
  const char* _InternalParse(const char* ptr, ::PROTOBUF_NAMESPACE_ID::internal::ParseContext* ctx) final;
  ::PROTOBUF_NAMESPACE_ID::uint8* _InternalSerialize(
      ::PROTOBUF_NAMESPACE_ID::uint8* target, ::PROTOBUF_NAMESPACE_ID::io::EpsCopyOutputStream* stream) const final;
  int GetCachedSize() const final { return _cached_size_.Get(); }

  private:
  inline void SharedCtor();
  inline void SharedDtor();
  void SetCachedSize(int size) const final;
  void InternalSwap(CacheMsgRequest* other);
  friend class ::PROTOBUF_NAMESPACE_ID::internal::AnyMetadata;
  static ::PROTOBUF_NAMESPACE_ID::StringPiece FullMessageName() {
    return "CacheService.CacheMsgRequest";
  }
  private:
  inline ::PROTOBUF_NAMESPACE_ID::Arena* GetArenaNoVirtual() const {
    return nullptr;
  }
  inline void* MaybeArenaPtr() const {
    return nullptr;
  }
  public:

  ::PROTOBUF_NAMESPACE_ID::Metadata GetMetadata() const final;
  private:
  static ::PROTOBUF_NAMESPACE_ID::Metadata GetMetadataStatic() {
    ::PROTOBUF_NAMESPACE_ID::internal::AssignDescriptors(&::descriptor_table_message_2eproto);
    return ::descriptor_table_message_2eproto.file_level_metadata[kIndexInFileMessages];
  }

  public:

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  enum : int {
    kIdFieldNumber = 1,
    kFuncFieldNumber = 2,
    kKeyFieldNumber = 3,
    kValueFieldNumber = 4,
    kConfigFieldNumber = 5,
  };
  // string _id = 1;
  void clear__id();
  const std::string& _id() const;
  void set__id(const std::string& value);
  void set__id(std::string&& value);
  void set__id(const char* value);
  void set__id(const char* value, size_t size);
  std::string* mutable__id();
  std::string* release__id();
  void set_allocated__id(std::string* _id);
  private:
  const std::string& _internal__id() const;
  void _internal_set__id(const std::string& value);
  std::string* _internal_mutable__id();
  public:

  // string func = 2;
  void clear_func();
  const std::string& func() const;
  void set_func(const std::string& value);
  void set_func(std::string&& value);
  void set_func(const char* value);
  void set_func(const char* value, size_t size);
  std::string* mutable_func();
  std::string* release_func();
  void set_allocated_func(std::string* func);
  private:
  const std::string& _internal_func() const;
  void _internal_set_func(const std::string& value);
  std::string* _internal_mutable_func();
  public:

  // string key = 3;
  void clear_key();
  const std::string& key() const;
  void set_key(const std::string& value);
  void set_key(std::string&& value);
  void set_key(const char* value);
  void set_key(const char* value, size_t size);
  std::string* mutable_key();
  std::string* release_key();
  void set_allocated_key(std::string* key);
  private:
  const std::string& _internal_key() const;
  void _internal_set_key(const std::string& value);
  std::string* _internal_mutable_key();
  public:

  // string value = 4;
  void clear_value();
  const std::string& value() const;
  void set_value(const std::string& value);
  void set_value(std::string&& value);
  void set_value(const char* value);
  void set_value(const char* value, size_t size);
  std::string* mutable_value();
  std::string* release_value();
  void set_allocated_value(std::string* value);
  private:
  const std::string& _internal_value() const;
  void _internal_set_value(const std::string& value);
  std::string* _internal_mutable_value();
  public:

  // string config = 5;
  void clear_config();
  const std::string& config() const;
  void set_config(const std::string& value);
  void set_config(std::string&& value);
  void set_config(const char* value);
  void set_config(const char* value, size_t size);
  std::string* mutable_config();
  std::string* release_config();
  void set_allocated_config(std::string* config);
  private:
  const std::string& _internal_config() const;
  void _internal_set_config(const std::string& value);
  std::string* _internal_mutable_config();
  public:

  // @@protoc_insertion_point(class_scope:CacheService.CacheMsgRequest)
 private:
  class _Internal;

  ::PROTOBUF_NAMESPACE_ID::internal::InternalMetadataWithArena _internal_metadata_;
  ::PROTOBUF_NAMESPACE_ID::internal::ArenaStringPtr _id_;
  ::PROTOBUF_NAMESPACE_ID::internal::ArenaStringPtr func_;
  ::PROTOBUF_NAMESPACE_ID::internal::ArenaStringPtr key_;
  ::PROTOBUF_NAMESPACE_ID::internal::ArenaStringPtr value_;
  ::PROTOBUF_NAMESPACE_ID::internal::ArenaStringPtr config_;
  mutable ::PROTOBUF_NAMESPACE_ID::internal::CachedSize _cached_size_;
  friend struct ::TableStruct_message_2eproto;
};
// -------------------------------------------------------------------

class CacheMsgReply :
    public ::PROTOBUF_NAMESPACE_ID::Message /* @@protoc_insertion_point(class_definition:CacheService.CacheMsgReply) */ {
 public:
  CacheMsgReply();
  virtual ~CacheMsgReply();

  CacheMsgReply(const CacheMsgReply& from);
  CacheMsgReply(CacheMsgReply&& from) noexcept
    : CacheMsgReply() {
    *this = ::std::move(from);
  }

  inline CacheMsgReply& operator=(const CacheMsgReply& from) {
    CopyFrom(from);
    return *this;
  }
  inline CacheMsgReply& operator=(CacheMsgReply&& from) noexcept {
    if (GetArenaNoVirtual() == from.GetArenaNoVirtual()) {
      if (this != &from) InternalSwap(&from);
    } else {
      CopyFrom(from);
    }
    return *this;
  }

  static const ::PROTOBUF_NAMESPACE_ID::Descriptor* descriptor() {
    return GetDescriptor();
  }
  static const ::PROTOBUF_NAMESPACE_ID::Descriptor* GetDescriptor() {
    return GetMetadataStatic().descriptor;
  }
  static const ::PROTOBUF_NAMESPACE_ID::Reflection* GetReflection() {
    return GetMetadataStatic().reflection;
  }
  static const CacheMsgReply& default_instance();

  static void InitAsDefaultInstance();  // FOR INTERNAL USE ONLY
  static inline const CacheMsgReply* internal_default_instance() {
    return reinterpret_cast<const CacheMsgReply*>(
               &_CacheMsgReply_default_instance_);
  }
  static constexpr int kIndexInFileMessages =
    1;

  friend void swap(CacheMsgReply& a, CacheMsgReply& b) {
    a.Swap(&b);
  }
  inline void Swap(CacheMsgReply* other) {
    if (other == this) return;
    InternalSwap(other);
  }

  // implements Message ----------------------------------------------

  inline CacheMsgReply* New() const final {
    return CreateMaybeMessage<CacheMsgReply>(nullptr);
  }

  CacheMsgReply* New(::PROTOBUF_NAMESPACE_ID::Arena* arena) const final {
    return CreateMaybeMessage<CacheMsgReply>(arena);
  }
  void CopyFrom(const ::PROTOBUF_NAMESPACE_ID::Message& from) final;
  void MergeFrom(const ::PROTOBUF_NAMESPACE_ID::Message& from) final;
  void CopyFrom(const CacheMsgReply& from);
  void MergeFrom(const CacheMsgReply& from);
  PROTOBUF_ATTRIBUTE_REINITIALIZES void Clear() final;
  bool IsInitialized() const final;

  size_t ByteSizeLong() const final;
  const char* _InternalParse(const char* ptr, ::PROTOBUF_NAMESPACE_ID::internal::ParseContext* ctx) final;
  ::PROTOBUF_NAMESPACE_ID::uint8* _InternalSerialize(
      ::PROTOBUF_NAMESPACE_ID::uint8* target, ::PROTOBUF_NAMESPACE_ID::io::EpsCopyOutputStream* stream) const final;
  int GetCachedSize() const final { return _cached_size_.Get(); }

  private:
  inline void SharedCtor();
  inline void SharedDtor();
  void SetCachedSize(int size) const final;
  void InternalSwap(CacheMsgReply* other);
  friend class ::PROTOBUF_NAMESPACE_ID::internal::AnyMetadata;
  static ::PROTOBUF_NAMESPACE_ID::StringPiece FullMessageName() {
    return "CacheService.CacheMsgReply";
  }
  private:
  inline ::PROTOBUF_NAMESPACE_ID::Arena* GetArenaNoVirtual() const {
    return nullptr;
  }
  inline void* MaybeArenaPtr() const {
    return nullptr;
  }
  public:

  ::PROTOBUF_NAMESPACE_ID::Metadata GetMetadata() const final;
  private:
  static ::PROTOBUF_NAMESPACE_ID::Metadata GetMetadataStatic() {
    ::PROTOBUF_NAMESPACE_ID::internal::AssignDescriptors(&::descriptor_table_message_2eproto);
    return ::descriptor_table_message_2eproto.file_level_metadata[kIndexInFileMessages];
  }

  public:

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  enum : int {
    kIdFieldNumber = 1,
    kDataFieldNumber = 3,
    kOkFieldNumber = 2,
  };
  // string _id = 1;
  void clear__id();
  const std::string& _id() const;
  void set__id(const std::string& value);
  void set__id(std::string&& value);
  void set__id(const char* value);
  void set__id(const char* value, size_t size);
  std::string* mutable__id();
  std::string* release__id();
  void set_allocated__id(std::string* _id);
  private:
  const std::string& _internal__id() const;
  void _internal_set__id(const std::string& value);
  std::string* _internal_mutable__id();
  public:

  // string data = 3;
  void clear_data();
  const std::string& data() const;
  void set_data(const std::string& value);
  void set_data(std::string&& value);
  void set_data(const char* value);
  void set_data(const char* value, size_t size);
  std::string* mutable_data();
  std::string* release_data();
  void set_allocated_data(std::string* data);
  private:
  const std::string& _internal_data() const;
  void _internal_set_data(const std::string& value);
  std::string* _internal_mutable_data();
  public:

  // bool ok = 2;
  void clear_ok();
  bool ok() const;
  void set_ok(bool value);
  private:
  bool _internal_ok() const;
  void _internal_set_ok(bool value);
  public:

  // @@protoc_insertion_point(class_scope:CacheService.CacheMsgReply)
 private:
  class _Internal;

  ::PROTOBUF_NAMESPACE_ID::internal::InternalMetadataWithArena _internal_metadata_;
  ::PROTOBUF_NAMESPACE_ID::internal::ArenaStringPtr _id_;
  ::PROTOBUF_NAMESPACE_ID::internal::ArenaStringPtr data_;
  bool ok_;
  mutable ::PROTOBUF_NAMESPACE_ID::internal::CachedSize _cached_size_;
  friend struct ::TableStruct_message_2eproto;
};
// ===================================================================


// ===================================================================

#ifdef __GNUC__
  #pragma GCC diagnostic push
  #pragma GCC diagnostic ignored "-Wstrict-aliasing"
#endif  // __GNUC__
// CacheMsgRequest

// string _id = 1;
inline void CacheMsgRequest::clear__id() {
  _id_.ClearToEmptyNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline const std::string& CacheMsgRequest::_id() const {
  // @@protoc_insertion_point(field_get:CacheService.CacheMsgRequest._id)
  return _internal__id();
}
inline void CacheMsgRequest::set__id(const std::string& value) {
  _internal_set__id(value);
  // @@protoc_insertion_point(field_set:CacheService.CacheMsgRequest._id)
}
inline std::string* CacheMsgRequest::mutable__id() {
  // @@protoc_insertion_point(field_mutable:CacheService.CacheMsgRequest._id)
  return _internal_mutable__id();
}
inline const std::string& CacheMsgRequest::_internal__id() const {
  return _id_.GetNoArena();
}
inline void CacheMsgRequest::_internal_set__id(const std::string& value) {
  
  _id_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), value);
}
inline void CacheMsgRequest::set__id(std::string&& value) {
  
  _id_.SetNoArena(
    &::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::move(value));
  // @@protoc_insertion_point(field_set_rvalue:CacheService.CacheMsgRequest._id)
}
inline void CacheMsgRequest::set__id(const char* value) {
  GOOGLE_DCHECK(value != nullptr);
  
  _id_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::string(value));
  // @@protoc_insertion_point(field_set_char:CacheService.CacheMsgRequest._id)
}
inline void CacheMsgRequest::set__id(const char* value, size_t size) {
  
  _id_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(),
      ::std::string(reinterpret_cast<const char*>(value), size));
  // @@protoc_insertion_point(field_set_pointer:CacheService.CacheMsgRequest._id)
}
inline std::string* CacheMsgRequest::_internal_mutable__id() {
  
  return _id_.MutableNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline std::string* CacheMsgRequest::release__id() {
  // @@protoc_insertion_point(field_release:CacheService.CacheMsgRequest._id)
  
  return _id_.ReleaseNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline void CacheMsgRequest::set_allocated__id(std::string* _id) {
  if (_id != nullptr) {
    
  } else {
    
  }
  _id_.SetAllocatedNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), _id);
  // @@protoc_insertion_point(field_set_allocated:CacheService.CacheMsgRequest._id)
}

// string func = 2;
inline void CacheMsgRequest::clear_func() {
  func_.ClearToEmptyNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline const std::string& CacheMsgRequest::func() const {
  // @@protoc_insertion_point(field_get:CacheService.CacheMsgRequest.func)
  return _internal_func();
}
inline void CacheMsgRequest::set_func(const std::string& value) {
  _internal_set_func(value);
  // @@protoc_insertion_point(field_set:CacheService.CacheMsgRequest.func)
}
inline std::string* CacheMsgRequest::mutable_func() {
  // @@protoc_insertion_point(field_mutable:CacheService.CacheMsgRequest.func)
  return _internal_mutable_func();
}
inline const std::string& CacheMsgRequest::_internal_func() const {
  return func_.GetNoArena();
}
inline void CacheMsgRequest::_internal_set_func(const std::string& value) {
  
  func_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), value);
}
inline void CacheMsgRequest::set_func(std::string&& value) {
  
  func_.SetNoArena(
    &::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::move(value));
  // @@protoc_insertion_point(field_set_rvalue:CacheService.CacheMsgRequest.func)
}
inline void CacheMsgRequest::set_func(const char* value) {
  GOOGLE_DCHECK(value != nullptr);
  
  func_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::string(value));
  // @@protoc_insertion_point(field_set_char:CacheService.CacheMsgRequest.func)
}
inline void CacheMsgRequest::set_func(const char* value, size_t size) {
  
  func_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(),
      ::std::string(reinterpret_cast<const char*>(value), size));
  // @@protoc_insertion_point(field_set_pointer:CacheService.CacheMsgRequest.func)
}
inline std::string* CacheMsgRequest::_internal_mutable_func() {
  
  return func_.MutableNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline std::string* CacheMsgRequest::release_func() {
  // @@protoc_insertion_point(field_release:CacheService.CacheMsgRequest.func)
  
  return func_.ReleaseNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline void CacheMsgRequest::set_allocated_func(std::string* func) {
  if (func != nullptr) {
    
  } else {
    
  }
  func_.SetAllocatedNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), func);
  // @@protoc_insertion_point(field_set_allocated:CacheService.CacheMsgRequest.func)
}

// string key = 3;
inline void CacheMsgRequest::clear_key() {
  key_.ClearToEmptyNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline const std::string& CacheMsgRequest::key() const {
  // @@protoc_insertion_point(field_get:CacheService.CacheMsgRequest.key)
  return _internal_key();
}
inline void CacheMsgRequest::set_key(const std::string& value) {
  _internal_set_key(value);
  // @@protoc_insertion_point(field_set:CacheService.CacheMsgRequest.key)
}
inline std::string* CacheMsgRequest::mutable_key() {
  // @@protoc_insertion_point(field_mutable:CacheService.CacheMsgRequest.key)
  return _internal_mutable_key();
}
inline const std::string& CacheMsgRequest::_internal_key() const {
  return key_.GetNoArena();
}
inline void CacheMsgRequest::_internal_set_key(const std::string& value) {
  
  key_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), value);
}
inline void CacheMsgRequest::set_key(std::string&& value) {
  
  key_.SetNoArena(
    &::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::move(value));
  // @@protoc_insertion_point(field_set_rvalue:CacheService.CacheMsgRequest.key)
}
inline void CacheMsgRequest::set_key(const char* value) {
  GOOGLE_DCHECK(value != nullptr);
  
  key_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::string(value));
  // @@protoc_insertion_point(field_set_char:CacheService.CacheMsgRequest.key)
}
inline void CacheMsgRequest::set_key(const char* value, size_t size) {
  
  key_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(),
      ::std::string(reinterpret_cast<const char*>(value), size));
  // @@protoc_insertion_point(field_set_pointer:CacheService.CacheMsgRequest.key)
}
inline std::string* CacheMsgRequest::_internal_mutable_key() {
  
  return key_.MutableNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline std::string* CacheMsgRequest::release_key() {
  // @@protoc_insertion_point(field_release:CacheService.CacheMsgRequest.key)
  
  return key_.ReleaseNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline void CacheMsgRequest::set_allocated_key(std::string* key) {
  if (key != nullptr) {
    
  } else {
    
  }
  key_.SetAllocatedNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), key);
  // @@protoc_insertion_point(field_set_allocated:CacheService.CacheMsgRequest.key)
}

// string value = 4;
inline void CacheMsgRequest::clear_value() {
  value_.ClearToEmptyNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline const std::string& CacheMsgRequest::value() const {
  // @@protoc_insertion_point(field_get:CacheService.CacheMsgRequest.value)
  return _internal_value();
}
inline void CacheMsgRequest::set_value(const std::string& value) {
  _internal_set_value(value);
  // @@protoc_insertion_point(field_set:CacheService.CacheMsgRequest.value)
}
inline std::string* CacheMsgRequest::mutable_value() {
  // @@protoc_insertion_point(field_mutable:CacheService.CacheMsgRequest.value)
  return _internal_mutable_value();
}
inline const std::string& CacheMsgRequest::_internal_value() const {
  return value_.GetNoArena();
}
inline void CacheMsgRequest::_internal_set_value(const std::string& value) {
  
  value_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), value);
}
inline void CacheMsgRequest::set_value(std::string&& value) {
  
  value_.SetNoArena(
    &::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::move(value));
  // @@protoc_insertion_point(field_set_rvalue:CacheService.CacheMsgRequest.value)
}
inline void CacheMsgRequest::set_value(const char* value) {
  GOOGLE_DCHECK(value != nullptr);
  
  value_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::string(value));
  // @@protoc_insertion_point(field_set_char:CacheService.CacheMsgRequest.value)
}
inline void CacheMsgRequest::set_value(const char* value, size_t size) {
  
  value_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(),
      ::std::string(reinterpret_cast<const char*>(value), size));
  // @@protoc_insertion_point(field_set_pointer:CacheService.CacheMsgRequest.value)
}
inline std::string* CacheMsgRequest::_internal_mutable_value() {
  
  return value_.MutableNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline std::string* CacheMsgRequest::release_value() {
  // @@protoc_insertion_point(field_release:CacheService.CacheMsgRequest.value)
  
  return value_.ReleaseNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline void CacheMsgRequest::set_allocated_value(std::string* value) {
  if (value != nullptr) {
    
  } else {
    
  }
  value_.SetAllocatedNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), value);
  // @@protoc_insertion_point(field_set_allocated:CacheService.CacheMsgRequest.value)
}

// string config = 5;
inline void CacheMsgRequest::clear_config() {
  config_.ClearToEmptyNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline const std::string& CacheMsgRequest::config() const {
  // @@protoc_insertion_point(field_get:CacheService.CacheMsgRequest.config)
  return _internal_config();
}
inline void CacheMsgRequest::set_config(const std::string& value) {
  _internal_set_config(value);
  // @@protoc_insertion_point(field_set:CacheService.CacheMsgRequest.config)
}
inline std::string* CacheMsgRequest::mutable_config() {
  // @@protoc_insertion_point(field_mutable:CacheService.CacheMsgRequest.config)
  return _internal_mutable_config();
}
inline const std::string& CacheMsgRequest::_internal_config() const {
  return config_.GetNoArena();
}
inline void CacheMsgRequest::_internal_set_config(const std::string& value) {
  
  config_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), value);
}
inline void CacheMsgRequest::set_config(std::string&& value) {
  
  config_.SetNoArena(
    &::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::move(value));
  // @@protoc_insertion_point(field_set_rvalue:CacheService.CacheMsgRequest.config)
}
inline void CacheMsgRequest::set_config(const char* value) {
  GOOGLE_DCHECK(value != nullptr);
  
  config_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::string(value));
  // @@protoc_insertion_point(field_set_char:CacheService.CacheMsgRequest.config)
}
inline void CacheMsgRequest::set_config(const char* value, size_t size) {
  
  config_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(),
      ::std::string(reinterpret_cast<const char*>(value), size));
  // @@protoc_insertion_point(field_set_pointer:CacheService.CacheMsgRequest.config)
}
inline std::string* CacheMsgRequest::_internal_mutable_config() {
  
  return config_.MutableNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline std::string* CacheMsgRequest::release_config() {
  // @@protoc_insertion_point(field_release:CacheService.CacheMsgRequest.config)
  
  return config_.ReleaseNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline void CacheMsgRequest::set_allocated_config(std::string* config) {
  if (config != nullptr) {
    
  } else {
    
  }
  config_.SetAllocatedNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), config);
  // @@protoc_insertion_point(field_set_allocated:CacheService.CacheMsgRequest.config)
}

// -------------------------------------------------------------------

// CacheMsgReply

// string _id = 1;
inline void CacheMsgReply::clear__id() {
  _id_.ClearToEmptyNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline const std::string& CacheMsgReply::_id() const {
  // @@protoc_insertion_point(field_get:CacheService.CacheMsgReply._id)
  return _internal__id();
}
inline void CacheMsgReply::set__id(const std::string& value) {
  _internal_set__id(value);
  // @@protoc_insertion_point(field_set:CacheService.CacheMsgReply._id)
}
inline std::string* CacheMsgReply::mutable__id() {
  // @@protoc_insertion_point(field_mutable:CacheService.CacheMsgReply._id)
  return _internal_mutable__id();
}
inline const std::string& CacheMsgReply::_internal__id() const {
  return _id_.GetNoArena();
}
inline void CacheMsgReply::_internal_set__id(const std::string& value) {
  
  _id_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), value);
}
inline void CacheMsgReply::set__id(std::string&& value) {
  
  _id_.SetNoArena(
    &::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::move(value));
  // @@protoc_insertion_point(field_set_rvalue:CacheService.CacheMsgReply._id)
}
inline void CacheMsgReply::set__id(const char* value) {
  GOOGLE_DCHECK(value != nullptr);
  
  _id_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::string(value));
  // @@protoc_insertion_point(field_set_char:CacheService.CacheMsgReply._id)
}
inline void CacheMsgReply::set__id(const char* value, size_t size) {
  
  _id_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(),
      ::std::string(reinterpret_cast<const char*>(value), size));
  // @@protoc_insertion_point(field_set_pointer:CacheService.CacheMsgReply._id)
}
inline std::string* CacheMsgReply::_internal_mutable__id() {
  
  return _id_.MutableNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline std::string* CacheMsgReply::release__id() {
  // @@protoc_insertion_point(field_release:CacheService.CacheMsgReply._id)
  
  return _id_.ReleaseNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline void CacheMsgReply::set_allocated__id(std::string* _id) {
  if (_id != nullptr) {
    
  } else {
    
  }
  _id_.SetAllocatedNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), _id);
  // @@protoc_insertion_point(field_set_allocated:CacheService.CacheMsgReply._id)
}

// bool ok = 2;
inline void CacheMsgReply::clear_ok() {
  ok_ = false;
}
inline bool CacheMsgReply::_internal_ok() const {
  return ok_;
}
inline bool CacheMsgReply::ok() const {
  // @@protoc_insertion_point(field_get:CacheService.CacheMsgReply.ok)
  return _internal_ok();
}
inline void CacheMsgReply::_internal_set_ok(bool value) {
  
  ok_ = value;
}
inline void CacheMsgReply::set_ok(bool value) {
  _internal_set_ok(value);
  // @@protoc_insertion_point(field_set:CacheService.CacheMsgReply.ok)
}

// string data = 3;
inline void CacheMsgReply::clear_data() {
  data_.ClearToEmptyNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline const std::string& CacheMsgReply::data() const {
  // @@protoc_insertion_point(field_get:CacheService.CacheMsgReply.data)
  return _internal_data();
}
inline void CacheMsgReply::set_data(const std::string& value) {
  _internal_set_data(value);
  // @@protoc_insertion_point(field_set:CacheService.CacheMsgReply.data)
}
inline std::string* CacheMsgReply::mutable_data() {
  // @@protoc_insertion_point(field_mutable:CacheService.CacheMsgReply.data)
  return _internal_mutable_data();
}
inline const std::string& CacheMsgReply::_internal_data() const {
  return data_.GetNoArena();
}
inline void CacheMsgReply::_internal_set_data(const std::string& value) {
  
  data_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), value);
}
inline void CacheMsgReply::set_data(std::string&& value) {
  
  data_.SetNoArena(
    &::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::move(value));
  // @@protoc_insertion_point(field_set_rvalue:CacheService.CacheMsgReply.data)
}
inline void CacheMsgReply::set_data(const char* value) {
  GOOGLE_DCHECK(value != nullptr);
  
  data_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), ::std::string(value));
  // @@protoc_insertion_point(field_set_char:CacheService.CacheMsgReply.data)
}
inline void CacheMsgReply::set_data(const char* value, size_t size) {
  
  data_.SetNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(),
      ::std::string(reinterpret_cast<const char*>(value), size));
  // @@protoc_insertion_point(field_set_pointer:CacheService.CacheMsgReply.data)
}
inline std::string* CacheMsgReply::_internal_mutable_data() {
  
  return data_.MutableNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline std::string* CacheMsgReply::release_data() {
  // @@protoc_insertion_point(field_release:CacheService.CacheMsgReply.data)
  
  return data_.ReleaseNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited());
}
inline void CacheMsgReply::set_allocated_data(std::string* data) {
  if (data != nullptr) {
    
  } else {
    
  }
  data_.SetAllocatedNoArena(&::PROTOBUF_NAMESPACE_ID::internal::GetEmptyStringAlreadyInited(), data);
  // @@protoc_insertion_point(field_set_allocated:CacheService.CacheMsgReply.data)
}

#ifdef __GNUC__
  #pragma GCC diagnostic pop
#endif  // __GNUC__
// -------------------------------------------------------------------


// @@protoc_insertion_point(namespace_scope)

}  // namespace CacheService

// @@protoc_insertion_point(global_scope)

#include <google/protobuf/port_undef.inc>
#endif  // GOOGLE_PROTOBUF_INCLUDED_GOOGLE_PROTOBUF_INCLUDED_message_2eproto
