package com.maker.website.machines.dtos;

import com.maker.website.machines.*;
import com.maker.website.machines.enums.MachineStatusENUM;

public record CreateMachineDTO(
        String name,
        String description,
        MachineStatusENUM status
) {
}
