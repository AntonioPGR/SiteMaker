package com.maker.website.machines;

import com.maker.website.machines.dtos.CreateMachineDTO;
import com.maker.website.machines.dtos.MachineResponseDTO;
import com.maker.website.machines.dtos.UpdateMachineDTO;
import com.maker.website.machines.enums.MachineStatusENUM; // Ajuste o pacote do Enum se necessário
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MachineService {

    private final MachineRepository machineRepository;

    public List<MachineResponseDTO> getAllMachines() {
        return machineRepository.findAllByStatusNot(MachineStatusENUM.UNUSABLE)
                .stream().map(MachineResponseDTO::new).toList();
    }

    public MachineResponseDTO getMachineById(Long id) {
        return new MachineResponseDTO(findActiveMachineById(id));
    }

    public MachineResponseDTO createMachine(CreateMachineDTO dto) {
        // Validações específicas se houver (ex: nome único, etc.)
        validateMachineName(dto.name());

        MachineEntity machine = new MachineEntity();
        machine.setName(dto.name());
        machine.setDescription(dto.description());
        // Defina o status inicial padrão se necessário
        machine.setStatus(MachineStatusENUM.FUNCTIONAL);

        return new MachineResponseDTO(machineRepository.save(machine));
    }

    public MachineResponseDTO updateMachine(Long id, UpdateMachineDTO dto) {
        MachineEntity machine = findActiveMachineById(id);

        if (dto.name() != null && !dto.name().equals(machine.getName())) {
            validateMachineName(dto.name());
            machine.setName(dto.name());
        }
        if (dto.description() != null) {
            machine.setDescription(dto.description());
        }
        if (dto.status() != null) {
            machine.setStatus(dto.status());
        }

        return new MachineResponseDTO(machineRepository.save(machine));
    }

    public void deleteMachine(Long id) {
        MachineEntity machine = findActiveMachineById(id);
        machine.setStatus(MachineStatusENUM.UNUSABLE);
        machineRepository.save(machine);
    }

    public MachineEntity findActiveMachineById(Long id) {
        return machineRepository.findByIdAndStatusNot(id, MachineStatusENUM.UNUSABLE)
                .orElseThrow(() -> new IllegalArgumentException("Machine not found."));
    }

    private void validateMachineName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Machine name is required.");
        }
        if (machineRepository.existsByName(name)) {
            throw new IllegalArgumentException("Machine name is already in use.");
        }
    }
}