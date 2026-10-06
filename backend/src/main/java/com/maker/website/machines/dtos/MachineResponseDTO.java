package com.maker.website.machines.dtos;

import com.maker.website.machines.MachineEntity;
import com.maker.website.machines.enums.MachineAccessENUM;
import java.time.LocalDateTime;

public record MachineResponseDTO(
        Long id,
        String name,
        String description,
        MachineAccessENUM access,
        LocalDateTime createdAt,
        LocalDateTime updatedAt


) {
    public MachineResponseDTO(MachineEntity machine) {
        this(
                machine.getId(),
                machine.getName(),
                machine.getDescription(),
                machine.getAccess(),
                machine.getCreatedAt(),
                machine.getUpdatedAt()
        );
    }
}
