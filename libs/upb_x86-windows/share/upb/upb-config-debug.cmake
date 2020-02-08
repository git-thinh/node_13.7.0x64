#----------------------------------------------------------------
# Generated CMake target import file for configuration "Debug".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "upb::upb" for configuration "Debug"
set_property(TARGET upb::upb APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(upb::upb PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_DEBUG "C"
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/debug/lib/upb.lib"
  )

list(APPEND _IMPORT_CHECK_TARGETS upb::upb )
list(APPEND _IMPORT_CHECK_FILES_FOR_upb::upb "${_IMPORT_PREFIX}/debug/lib/upb.lib" )

# Import target "upb::upb_json" for configuration "Debug"
set_property(TARGET upb::upb_json APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(upb::upb_json PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_DEBUG "C"
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/debug/lib/upb_json.lib"
  )

list(APPEND _IMPORT_CHECK_TARGETS upb::upb_json )
list(APPEND _IMPORT_CHECK_FILES_FOR_upb::upb_json "${_IMPORT_PREFIX}/debug/lib/upb_json.lib" )

# Import target "upb::upb_pb" for configuration "Debug"
set_property(TARGET upb::upb_pb APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(upb::upb_pb PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_DEBUG "C"
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/debug/lib/upb_pb.lib"
  )

list(APPEND _IMPORT_CHECK_TARGETS upb::upb_pb )
list(APPEND _IMPORT_CHECK_FILES_FOR_upb::upb_pb "${_IMPORT_PREFIX}/debug/lib/upb_pb.lib" )

# Import target "upb::handlers" for configuration "Debug"
set_property(TARGET upb::handlers APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(upb::handlers PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_DEBUG "C"
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/debug/lib/handlers.lib"
  )

list(APPEND _IMPORT_CHECK_TARGETS upb::handlers )
list(APPEND _IMPORT_CHECK_FILES_FOR_upb::handlers "${_IMPORT_PREFIX}/debug/lib/handlers.lib" )

# Import target "upb::legacy_msg_reflection" for configuration "Debug"
set_property(TARGET upb::legacy_msg_reflection APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(upb::legacy_msg_reflection PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_DEBUG "C"
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/debug/lib/legacy_msg_reflection.lib"
  )

list(APPEND _IMPORT_CHECK_TARGETS upb::legacy_msg_reflection )
list(APPEND _IMPORT_CHECK_FILES_FOR_upb::legacy_msg_reflection "${_IMPORT_PREFIX}/debug/lib/legacy_msg_reflection.lib" )

# Import target "upb::reflection" for configuration "Debug"
set_property(TARGET upb::reflection APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(upb::reflection PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_DEBUG "C"
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/debug/lib/reflection.lib"
  )

list(APPEND _IMPORT_CHECK_TARGETS upb::reflection )
list(APPEND _IMPORT_CHECK_FILES_FOR_upb::reflection "${_IMPORT_PREFIX}/debug/lib/reflection.lib" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
