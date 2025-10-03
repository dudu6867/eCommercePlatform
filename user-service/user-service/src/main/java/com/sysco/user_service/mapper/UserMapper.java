package com.sysco.user_service.mapper;

import com.sysco.user_service.dto.UserDTO;
import com.sysco.user_service.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .address(user.getAddress())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public User toEntity(UserDTO dto) {
        return User.builder()
                .id(dto.getId())
                .name(dto.getName())
                .address(dto.getAddress())
                .email(dto.getEmail())
                .role(dto.getRole())
                .build();
    }
}
