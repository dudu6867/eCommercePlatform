package com.sysco.user_service.service;

import com.sysco.user_service.dto.UserDTO;
import com.sysco.user_service.exception.EmailAlreadyExistsException;
import com.sysco.user_service.exception.UserNotFoundException;
import com.sysco.user_service.mapper.UserMapper;
import com.sysco.user_service.model.User;
import com.sysco.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final UserMapper mapper;

    public UserDTO createUser(UserDTO dto) {
        if (repository.existsByEmail(dto.getEmail())) {
            throw new EmailAlreadyExistsException("Email already in use: " + dto.getEmail());
        }
        User user = mapper.toEntity(dto);
        User saved = repository.save(user);
        return mapper.toDto(saved);
    }

    public UserDTO getUserById(Long id) {
        return repository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID " + id));
    }

    public UserDTO updateUser(Long id, UserDTO dto) {
        User user = repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID " + id));

        user.setName(dto.getName());
        user.setAddress(dto.getAddress());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());

        User updated = repository.save(user);
        return mapper.toDto(updated);
    }

    public UserDTO getUserByEmail(String email) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email " + email));
        return mapper.toDto(user);
    }

    public void deleteUser(Long id) {
        if (!repository.existsById(id)) {
            throw new UserNotFoundException("User not found with ID " + id);
        }
        repository.deleteById(id);
    }
}

